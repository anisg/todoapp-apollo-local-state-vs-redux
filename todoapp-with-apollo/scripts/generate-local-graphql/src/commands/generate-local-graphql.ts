import {Command, flags} from '@oclif/command'
import {ClientCommand} from 'apollo'
import { Kind, DocumentNode } from "graphql";
import {customCodeGenerate,createRemoveFolderOnCondition} from './generate'

export default class Hello extends ClientCommand {
  static aliases = ["codegen:generate"];
  static description =
    "Generate static types for GraphQL queries. Can use the published schema in Apollo Graph Manager or a downloaded schema.";

  static flags = {
    ...ClientCommand.flags,
    watch: flags.boolean({
      description: "[TODO] Watch for file changes and reload codegen"
    }),

  }
  static args = []

  async run() {
    const {
      flags: { watch, },
      args: { output }
    } = this.parse(Hello);
    let launchCodeGen;
    const run = () => this.runTasks(({ flags, args, project }) => {
//      console.log('flags', flags)
//      console.log('args', args)
//      console.log('project', project)
      return [
        {
          title:"Generating query files",
          task: async (ctx, task) => {
            const schema = await project.resolveSchema({
              tag: flags.tag
            });
            if (!schema) throw new Error("Error loading schema");
            //console.log('complete schema', schema)
            //console.log('opera',this.project.operations)
            //console.log('frag',this.project.fragments)
            launchCodeGen = () => {
              //console.log('called')
              project.validate();
              const operations = Object.values(this.project.operations);
              const fragments = Object.values(this.project.fragments);

              //console.log('opera',this.project.operations)
              //console.log('frag',this.project.fragments)
              const document = {
                kind: Kind.DOCUMENT,
                definitions: [...operations, ...fragments]
              }
              return customCodeGenerate(document,schema);
            }

            const writtenFiles = launchCodeGen();

            task.title = `Generating query files - wrote ${writtenFiles} files`;
          }
        }
      ];
    });
    return run();
  }

}