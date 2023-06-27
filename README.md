# Sample Web API
sample web API created based on Clean Architecture using express js which is built on top of node js.
the API works using four layers Presentation layer, Application layer, Infrastructure Layer and Core Domain.

## how to prepare for use?
1. Node js requirements.
1. prepare all layers for linking.
2. link the domain layer with the other layers.
3. link the Application layer with the Presentation layer.
4. link the Infrastructure layer with the Presentation layer.

### NODE JS REQUIREMENTS
build with node v18

### PREPARE ALL LAYERS FOR LINKING
run the following command by change directory in all the four layer (Application, Infrastructure, Domain, WebApi) folders

`npm link`

### LINK DOMAIN LAYER WITH OTHERS
folder structure looks like this

    |- CleanBackend
        |-Application
        |-Domain
        |-Infrastructure
        |-SmallApp
        |-Test


**a.** change directory to domain folder.

`cd ./Domain`

**b.** link your domain with webapi folder/layer. in this folder structure case the web api folder is called 'SmallApp'. therefore run the following command.

`npm link ../SmallApp`

**c.** link your domain with Application folder/layer.

`npm link ../Application`

**d.** link your domain with Infrastructure folder/layer.

`npm link ../Infrastructure`

### LINK APPLICATION WITH PRESENTATION LAYER
change directory to application folder. then link to the webAPI (presentation) layer.

`cd ../Application`
`npm link ../SmallApp`

### LINK INFRASTRUCTURE WITH PRESENTATION LAYER
change directory to infrastructure folder. then link the webAPI (presentation) layer.

`cd ../Infrastructure`
`npm link ../SmallApp`
