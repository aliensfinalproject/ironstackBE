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

Route.get('/class','ClassController.read').middleware('auth')
Route.post('/class/create','ClassController.addClass').middleware('auth')
Route.put('/class/update/:classId','ClassController.editClass').middleware('auth')
Route.delete('/class/delete/:classId','ClassController.deleteClass').middleware('auth')

Route.post('/post', 'PostController.create').middleware('auth')
Route.get('/posts', 'PostController.index').middleware('auth')
Route.get('/post/:post_id', 'PostController.show').middleware('auth')
Route.put('/post/:post_id', 'PostController.update').middleware('auth')
Route.delete('/post/:post_id', 'PostController.delete').middleware('auth')

Route.post('/post/:id/comments', 'CommentController.create').middleware('auth')
Route.get('/comments', 'CommentController.index').middleware('auth')
Route.put('/comments/:id', 'CommentController.update').middleware('auth')
Route.delete('/comments/:id', 'CommentController.delete').middleware('auth')

Route.post('/assignment', 'AssignmentController.create').middleware('auth')
Route.get('/assignments', 'AssignmentController.index').middleware('auth')
Route.get('/assignment/:id', 'AssignmentController.show').middleware('auth')
Route.put('/assignment/:id', 'AssignmentController.update').middleware('auth')
Route.delete('/assignment/:id', 'AssignmentController.delete').middleware('auth')

Route.get('/test', 'AssignmentController.test').middleware('auth')
