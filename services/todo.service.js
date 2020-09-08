
const fs = require('fs') 
const todos = _createTodos();

function query(name) {
    var filteredTodos = todos.filter(todo => todo.name === name);
    return Promise.resolve(filteredTodos);
}

function add(todo) {
    todo.id = _makeId()
    todos.push(todo)
    _saveTodosToFile();
    return Promise.resolve(todo)
}

function update(todo) {
    var todoIdx = todos.findIndex(currTodo => currTodo.id === todo.id);
    todos.splice(todoIdx, 1, todo);
    _saveTodosToFile();
    return Promise.resolve(todo)
}

function getById(id) {
    var todo = todos.find(todo => todo.id === id);
    if (todo)  return Promise.resolve(todo);
    else return Promise.reject('Unknown Todo');
}

function remove(id) {
    var todoIdx = todos.findIndex(todo => todo.id === id);
    todos.splice(todoIdx, 1)
    _saveTodosToFile();
    return Promise.resolve();
}

function makeCaptcha(){
    return {
         num1: Math.floor(Math.random() * 10 + 1),
         num2: Math.floor(Math.random() * 10 + 1), 
        };
}

function _makeId(length=3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _createTodos() {

    var todos = require('../data/todo.json')
    if (todos && todos.length) return todos;
    return ['Do the Stuff', 'Eat the Lunch'].map(_createTodo)
}

function _createTodo(txt) {
    return {
        id: _makeId(),
        txt,
        isDone: false
    }
}

function _saveTodosToFile() {
    fs.writeFileSync('data/todo.json', JSON.stringify(todos, null, 2));
}

module.exports = {
    query,
    getById,
    remove,
    add,
    update,
    makeCaptcha
}
