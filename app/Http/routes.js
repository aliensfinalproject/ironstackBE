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
Route.put('user', 'UserController.updateClassId').middleware('auth')
Route.delete('/users/delete/:id','UserController.deleteUser').middleware('auth')

Route.get('/class','ClassController.read').middleware('auth')
Route.post('/class/create','ClassController.addClass').middleware('auth')
Route.put('/class/update/:id','ClassController.editClass').middleware('auth')
Route.delete('/class/delete/:id','ClassController.deleteClass').middleware('auth')
Route.get('/class/:id','ClassController.singleClass').middleware('auth')

Route.get('/users/me/posts','PostController.read').middleware('auth')
Route.post('/class/:id/post', 'PostController.create').middleware('auth')
Route.get('/class/:id/posts', 'PostController.index').middleware('auth')
Route.get('/class/:id/post/:post_id', 'PostController.show').middleware('auth')
Route.put('/class/:id/post/:post_id', 'PostController.update').middleware('auth')
Route.delete('/class/:id/post/:post_id', 'PostController.delete').middleware('auth')

Route.post('/post/:id/comments', 'CommentController.create').middleware('auth')
Route.get('/comments', 'CommentController.index').middleware('auth')
Route.put('/comments/:id', 'CommentController.update').middleware('auth')
Route.delete('/comments/:id', 'CommentController.delete').middleware('auth')
