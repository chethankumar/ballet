# ballet
Micro Service dev orchestrator

> Make your microservices work for you!

**ballet** enables you to build and run all your microservices in a project elegantly.

## Installation

run command ``` npm install -g micro-ballet```

(You may want to add *sudo* when running on *nix or Mac systems)

## How to setup?

### Step 1:

 In all your individual micro services, include the *config* in their package.json

 The config should be in the below format

 ```
//package.json

"ballet":{
    "project" : "<projectName>",
    "build" : [
        "<build command 1>",
        "<build command 2>"
    ],
    "run" : [
        "<run command 1>",
        "<run command 2>"
    ]
}

 ```

### Step 2:

In the root folder which contains all your microservice, run the following commands to build and run

**Build**

```
ballet prep <projectName>
```

**Run**

```
ballet dance <projectName>
```