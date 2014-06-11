require('zappajs') ->
  @use static: __dirname + '/assets'
  @set 'view engine': 'jade', views: "#{__dirname}/views"
  @io.set('log level', 1)
  # @io.set('transports', ['xhr-polling'])

  usersArr = []
  canvas = null

  @get '/' : (req, res) ->
    @render 'index',  users : usersArr, canvas: JSON.stringify(canvas)

  @on 'disconnect' : () ->
    users = []
    users = usersArr.filter (user) => user.id isnt @id
    usersArr = users

    @broadcast 'leaveUser':  @id

  @on 'newUser' : (user) ->
    usersArr.push(user)
    @broadcast 'addNewUser': user

  @on 'draw' : (data) ->
    @broadcast 'whiteboard': data

   @on 'save' : (data) ->
    canvas = data.canvas


