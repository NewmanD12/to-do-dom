let form = document.querySelector('#form')
let todo = document.querySelector('#todo')
let todoListHtml = document.querySelector('#todoList')
let clearButton = document.querySelector('#removeAll')

let todoList = []


form.addEventListener('submit', function(e){
    e.preventDefault()
    todoList.push({'to-do' : todo.value, 'edit_history' : [], completed : false})
    todo.value = ''
    createListItems(todoList)
})

function createListItems(list){
    clearHtmlList()
    for(let todo of list){
        let editButton = document.createElement('input')
        let deleteButton = document.createElement('input')
        editButton.setAttribute('type', 'submit')
        editButton.setAttribute('value', 'Edit')
        deleteButton.setAttribute('type', 'submit')
        deleteButton.setAttribute('value', 'Delete')
        editButton.addEventListener('click', function(){
            let editBox = document.createElement('input')
            let submitButton = document.createElement('input')
            submitButton.setAttribute('type', 'submit')
            submitButton.setAttribute('value', 'submit')
            submitButton.addEventListener('click', function(){
                for(let li of todoList){
                    if(li['to-do'] === todo['to-do']){
                        li['edit_history'] += todo['to-do'] + ', '
                        li['to-do'] = editBox.value
                        clearHtmlList()
                        createListItems(todoList)
                    }
                }
            })
            editBox.setAttribute('placeholder', item.innerText)
            item.innerText = ''
            item.appendChild(editBox)
            item.appendChild(submitButton)
        })

        deleteButton.addEventListener('click', function(){
            for(let li of todoList){
                if(li['to-do'] === todo['to-do']){
                    todoList = todoList.filter(item => item['to-do'] !== li['to-do'])
                    createListItems(todoList)
                }
            }
        })
        
        let item = document.createElement('li')
        item.innerText = todo['to-do']
        item.addEventListener('click', function(){
            if(item.style.textDecoration === ''){
                item.style.textDecoration = 'line-through'
                toggleCompletedTodo(item.innerText)
            }
            else {
                item.style.textDecoration = ''
                toggleCompletedTodo(item.innerText)
            }
        })
        item.appendChild(editButton)
        item.appendChild(deleteButton)
        todoListHtml.appendChild(item)
    }
}

clearButton.addEventListener('click', removeAllFromList)

function clearHtmlList(){
    let todoListItems = document.querySelectorAll('#todoList li')
    for(let item of todoListItems){
        item.remove()
    }
}

function removeAllFromList(){
    clearHtmlList()
    todoList = []
}

function toggleCompletedTodo(todo){
    for(let item of todoList){
        if(item['to-do'] === todo){
            item.completed = !item.completed
        }

    }
}

