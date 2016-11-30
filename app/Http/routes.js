'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')

Route.post('/register','UserController.signUp')
Route.post('/login','UserController.login')
Route.get('/usermgmt','UserController.list').middleware('auth')
Route.post('/usermgmt/:id','UserController.update').middleware('auth')

Route.get('/class')
Route.post('/class/create','ClassController.addClass').middleware('auth')
Route.put('/class/update')
Route.delete('/class/delete')
