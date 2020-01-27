const fs = require('fs')
const path = require('path')

import { DocumentNode,GraphQLSchema } from "graphql";
import {
    compileToIR,
    CompilerContext,
    CompilerOptions
  } from "apollo-codegen-core/lib/compiler";

import {
    generateLocalSource as generateTypescriptLocalSource,
    generateGlobalSource as generateTypescriptGlobalSource
} from "apollo-codegen-typescript";
import { BasicGeneratedFile } from "apollo-codegen-core/lib/utilities/CodeGenerator";
import gql from 'graphql-tag'
import { Children } from 'react';
import { writeFileSync } from 'fs';

const HEADER = `
/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.
`


export const deleteFolderRecursive = function(p) {
    if (fs.existsSync(p)) {
      fs.readdirSync(p).forEach((file, index) => {
        const curPath = path.join(p, file);
        if (fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(p);
    }
  };

const removeFile = (pathName) => {
    console.log('removing ',pathName);
    fs.unlinkSync(pathName)
}

const writeFile = (pathName,output,currentFiles) =>  {fs.writeFileSync(
    pathName,
    output
  );
  currentFiles[pathName]=true;
}


function writeGeneratedFiles(
    generatedFiles: { [fileName: string]: BasicGeneratedFile },
    outputDirectory: string,
    currentFiles
  ) {
    for (const [fileName, generatedFile] of Object.entries(generatedFiles)) {
        writeFile(
        path.join(outputDirectory, fileName),
        generatedFile.output.concat(""),
        currentFiles
      );
    }
  }
  

const createFolderIfNotExist = (dirPath:string) => {
    if (dirPath.split(".").length <= 1 && !fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
}

export const createRemoveFolderOnCondition = (dirPath, cond) => {
    if (cond == false){
        deleteFolderRecursive(dirPath);
    } else {
        createFolderIfNotExist(dirPath);
    }
}

const genIndexOperators = (exporters) => {
    let content = ""
    content += HEADER;

    for (let k in exporters){
        content += `// ${k}\n`
        exporters[k].forEach((e)=>{
            content += `export * from './${e}'\n`;
        })
    }
    return content;
}

const generateFragment = (fragment:{name:string,content:string}) => `
export const ${fragment.name} = \`${fragment.content}\`
`;

const genUtil = (globalContent,fragments) => `
// ~ auto generated
import { DocumentNode } from "graphql";

${globalContent}
${fragments.map(generateFragment).join('\n')}

export {gql as graphql} from '@apollo/client'


export interface ExtQuery<T,T2> extends DocumentNode {
}

export interface ExtSubscription<T,T2> extends DocumentNode {
}

export interface ExtMutation<T,T2> extends DocumentNode {
  
}

`
const genRootQl = () => `
// ~ auto generated
import * as op from './op'
import {ExtQuery,ExtMutation,ExtSubscription} from './util'
import {
    useQuery as useQueryOrig,
    useMutation as useMutationOrig,
    useSubscription as useSubscriptionOrig,
    useLazyQuery as useLazyQueryOrig,
    MutationHookOptions,
    QueryHookOptions,
    SubscriptionHookOptions,
    LazyQueryHookOptions,
} from '@apollo/client'

export function useQuery<A,B> (x:ExtQuery<A,B>,opt?:QueryHookOptions<A,B>) {
    return useQueryOrig<A,B>(x,opt);
}
export function useLazyQuery<A,B> (x:ExtQuery<A,B>,opt?:LazyQueryHookOptions<A,B>) {
    return useLazyQueryOrig<A,B>(x,opt);
}

export function useMutation<A,B> (x:ExtMutation<A,B>,opt?:MutationHookOptions<A,B>) {
    return useMutationOrig<A,B>(x,opt);
}

export function useSubscription<A,B> (x:ExtSubscription<A,B>,opt?:SubscriptionHookOptions<A,B>) {
    return useSubscriptionOrig<A,B>(x,opt);
}
export {graphql as gql} from './util'

export default op

`

const updateOperationOutput = (output:string,baseName,opType,context,enums,fragments):string => {
    //check if enums in output
    const source = context.operations[baseName].source;
    const enumsToImport = enums.filter(e => output.indexOf(e) != -1);
    const fragmentsToImport = fragments.filter(e => source.indexOf(e.name) != -1);
    //console.log(fragments)
    output = `import {graphql,${opType == 'query' ? 'ExtQuery' : opType == 'mutation' ? 'ExtMutation' : 'ExtSubscription'},${[...enumsToImport,...fragmentsToImport.map(e=>e.name)].join(',')}} from '../util'
    ` + output;
    
    if (output.indexOf(`${baseName}Variables`) == -1){
        output += `
export interface ${baseName}Variables {};
`
    }
    output += `
export const ${baseName}:${opType == 'query' ? 'ExtQuery' : opType == 'mutation' ? 'ExtMutation' : 'ExtSubscription'}<${baseName},${baseName}Variables> = graphql\`
    ${source}
    ${fragmentsToImport.map(e=>`\$\{${e.name}\}`).join('\n')}
\``
        return output;

}

const extendOutput = (output,fileName,context:CompilerContext,exporters,enums:string[],fragments): {'subpath':string,output:string}  => {
    //append at the end of the output an export of the generated operation
    let baseName = fileName.split('.')[0]
    console.log('basename', baseName)
    //find current operations
    let opType = context.operations[baseName].operationType;
    if (opType == 'query'){
        exporters.query.push(baseName);
    }
    if (opType == 'mutation'){
        exporters.mutation.push(baseName);
    }
    if (opType == 'subscription'){
        exporters.subscription.push(baseName);
    }
    return {subpath:`./op/${fileName}`, output:updateOperationOutput(output,baseName,opType,context,enums,fragments)};
}


const getAllEnum = (str) => {
    var regexp = /enum (\w+) {/g;
    return [...str.matchAll(regexp)].map(e => e[1]);
}
const getAllInputType = (str) => {
    var regexp = /interface (\w+) {/g;
    return [...str.matchAll(regexp)].map(e => e[1]);
}

const getCurrentExistingSubFiles = (dirPath) => {
    let files = {};
    const curFiles = fs.readdirSync(dirPath);
    curFiles.forEach(e => {
        const p = `${dirPath}/${e}`;
        if (fs.lstatSync(p).isDirectory()){
            files = {...files, ...getCurrentExistingSubFiles(p)}
        } else {
            files[p]=false;
        }
    })
    return files;
}

export const customCodeGenerate = (document:DocumentNode,schema:GraphQLSchema) => {
    let writtenFiles = 0;
    let generatedDir = path.resolve('./src/generated');

    createFolderIfNotExist(generatedDir);

    //generate typescript!
    const context:CompilerContext = compileToIR(schema, document, {omitDeprecatedEnumCases:true});
//    console.log('context>>>>', context)
    const generatedFiles = generateTypescriptLocalSource(context);
    const generatedGlobalFile = generateTypescriptGlobalSource(context);

//    console.log('generatedFiles', generatedFiles)
//    console.log('generatedGlobal', generatedGlobalFile)
    let enumsAndInputTypes:string[] = [...getAllEnum(generatedGlobalFile.fileContents),...getAllInputType(generatedGlobalFile.fileContents)];
    const outFiles = {};
    const exporters = {
        query:[],
        fragment:[],
        subscription:[],
        mutation:[],
    }
        const fragments = [];
    const generatedOperationFiles = generatedFiles.filter(({sourcePath,fileName,content})=>{
        let baseName = fileName.split('.')[0]
        if (!(baseName in context.operations)){
            //assume its a fragment
            fragments.push({name:baseName, content:context.fragments[baseName].source});
            return false;
        } 
        return true
    });
    generatedOperationFiles.forEach(({sourcePath,fileName,content})=>{
        //console.log('outputGenerated', content().output);
        let output = content().output;
        let x = extendOutput(output, fileName, context,exporters, enumsAndInputTypes, fragments)
        outFiles[x.subpath] = { output:x.output }
    })

    //check need to create dir 
/*    createRemoveFolderOnCondition(`${generatedDir}/op/query`,exporters.query.length>0);
    createRemoveFolderOnCondition(`${generatedDir}/op/mutation`,exporters.mutation.length>0);
    createRemoveFolderOnCondition(`${generatedDir}/op/subscription`,exporters.subscription.length>0);
*/
    const currentFiles:{[name:string] : boolean} = getCurrentExistingSubFiles(generatedDir);

    createFolderIfNotExist(`${generatedDir}/op`);
    writeGeneratedFiles(outFiles,`${generatedDir}/`,currentFiles);
    //create exporters now!
    writeFile(path.resolve(`${generatedDir}/op/index.ts`), genIndexOperators(exporters), currentFiles)
    //create generated Util
    writeFile(path.resolve(`${generatedDir}/util.ts`), genUtil(generatedGlobalFile.fileContents,fragments), currentFiles)
    //create generated Ql
    writeFile(path.resolve(`${generatedDir}/ql.ts`), genRootQl(), currentFiles)
    //remove non used files
    Object.keys(currentFiles).forEach(n=>currentFiles[n] == false && removeFile(n))
    writtenFiles += Object.keys(outFiles).length + 3;

    return writtenFiles;
}