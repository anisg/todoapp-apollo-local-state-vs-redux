import ql,{gql} from './generated/ql'
import {TodoItemStatus} from './generated/util'
import produce from "immer"

const fragment = gql`
        fragment todo on TodoItem {
            content
            status
            isLoading
        }
`

let idx = 0;
export const resolvers = {

    Mutation:{
        addTodoItem:(_,{content},{cache})=>{
            const prev = cache.readQuery({ query:ql.showTodos })
            const newItem = ({__typename: 'TodoItem',id:idx++, content, status:TodoItemStatus.active, isLoading:false})
            const data = {
                todos:[newItem, ...prev.todos]
            }
            cache.writeData({ data });
            return newItem;
        },

        updateTodoItem:(_,{id,content=null,status=null}, {cache,getCacheKey})=>{
            //get item
            const cacheId = getCacheKey({ __typename: 'TodoItem', id: id });
            const todo = cache.readFragment({ fragment, id:cacheId });
            const nextTodo = produce(todo, x=>{
                if (content) x.content = content;
                if (status) x.status = status;
            })
            cache.writeData({data:nextTodo, id:cacheId});
            return true;
        },

        removeTodoItem:(_,{id},{cache})=>{
            const prev = cache.readQuery({ query:ql.showTodos })
            const todos = prev.todos.filter(e=>e.id!=id);
            cache.writeData({ data:{todos} })
            return prev.todos.filter(e=>e.id==id)[0];
        },

        clearCompletedItems:(_,__,{cache})=>{
            const prev = cache.readQuery({ query:ql.showTodos })
            let completedItems = []
            const todos = prev.todos.filter(e=>{
                const completed = (e.status == TodoItemStatus.completed);
                if (completed) completedItems.push(e);
                return !completed;
            });
            cache.writeData({ data:{todos} })
            return completedItems;
        },
    },

    TodoItem:{
    }
}