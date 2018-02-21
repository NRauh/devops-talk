<!-- Prep: start todo app and open, open travis, open github -->
class: center, middle
# DevOps 101

[https://github.com/NRauh/devops-talk](https://github.com/NRauh/devops-talk)

???
* Short intro to dev ops and some tools
* Nothing too advance like Kubernetes
* Just starting point for web devs


---
class: center, middle
# DevOps? Continous Integration? Continous Deployment?

???
* Terms get tossed around
* No single definition

---
# Continous *

* Integration
  - Focuses on getting code integrated quickly and easily
* Deployment
  - Automate building and distributing releases

???
* Continous Integration
  - Make it easy to add code
  - Do it often
  - Changes don't unexpectadly break things
  - Easier for devs to react to changes
* Continous Deployment
  - Similar to CI
  - Deploy smaller and often
  - Make it easier to deploy
* Not mutually exclusive


---
# DevOps

* Umbrella term for continous integration and deployment
* Mindset of automating things

???
* Catch all for automation
* Do things through code
* DevOps is a mindset, CI/CD is a desired outcome


---
# Benefits

* Stability
  - Consistency between deployments
  - Reproducable things
* Version control
  - Review more changes in pull requests
* Code throughput
* Self documenting
* Reduce knowledge silos

???
* Biggest reason: stability
  - Easy to replicate environments
  - High confidence things are consistent
* Version control
  - Review changes
  - Roll back if needed
* Self documenting for complex things
* Downsides
  - Learning curve
  - Many tools (daunting)
* Benefits outweight the downsides


---
class: center, middle
# Intro to project

???
* Simple todo app
  - Built with React
* Not the focus
* [add a few items, mark a couple as complete]


---
class: center, middle
# Testing is important

???
* Biggest part of CI is knowing you didn't break things
* Need to write tests to do this
* Not a talk about testing
  - Tons of resources
  - Fairly common
  - Lots of opinions
  - Stack specific
* Don't want to leave anyone in the dark about JS testing
* This project uses Jest
  - Recommend for simplicity and features
* Generally similar regardless of framework


---
# Simple JS Test (using Jest)

```js
// thing.js
export function add(x, y) {
  return x + y;
}
```

???
* Add function
* Two params, returns their sum

--
```js
// thing.spec.js
import { add } from './thing';

describe('add', () => {
  it('should add the parameters', () => {
    var result = add(2, 3);
    expect(result).toBe(5);
  });
});
```

???
* Simple test around it


---
# Simple JS Test (using Jest)

```js
// thing.js
export function add(x, y) {
  return x + y;
}
```
```js
// thing.spec.js
import { add } from './thing';

*describe('add', () => {
  it('should add the parameters', () => {
    var result = add(2, 3);
    expect(result).toBe(5);
  });
*});
```

???
* Describe block
  - Mostly organization
  - First param is arbitrary string
  - Second is callback


---
# Simple JS Test (using Jest)

```js
// thing.js
export function add(x, y) {
  return x + y;
}
```
```js
// thing.spec.js
import { add } from './thing';

describe('add', () => {
* it('should add the parameters', () => {
    var result = add(2, 3);
    expect(result).toBe(5);
* });
});
```

???
* It block
  - Any number
  - The actual test
  - First param arbitrary string
  - Second is a callback


---
# Simple JS Test (using Jest)

```js
// thing.js
export function add(x, y) {
  return x + y;
}
```
```js
// thing.spec.js
*import { add } from './thing';

describe('add', () => {
  it('should add the parameters', () => {
*   var result = add(2, 3);
*   expect(result).toBe(5);
  });
});
```

???
* Inside it block we run the function
* Make an assertion on the result


---
# Simple JS Test (using Jest)

```js
// thing.js
export function add(x, y) {
  return x + y;
}
```
```js
// thing.spec.js
import { add } from './thing';

describe('add', () => {
  it('should add the parameters', () => {
    var result = add(2, 3);
    expect(result).toBe(5);
  });
});
```

```sh
# in command line
jest thing.spec.js
```

???
* Run using `jest thing.spec.js`


---
# Helpful Tools

* Test Frameworks
  - Jest
  - Jasmine
  - Mocha, Chai, Sinon (used together)
* Karma: Run your tests inside an actual browser
* Nightwatch: Write tests as a user
  - TestCafe: Same goal as Nightwatch, but doesn't require WebDriver (and Java)

???
* Already mentioned Jest
* Jasmine
* When used together, Mocha, Chai, Sinon
* Karma can run tests in browser instead of terminal
* Nightwatch and TestCafe for end to end tests
  - Tests from perspective of user


---
# Linting

* Enforce consistent formatting
* Catch bugs or common mistakes

???
* Linting can help
  - Especially among many developers
* Linter will
  - Scan code
  - Complain when you don't follow set styles
* Help catch bugs or common mistakes
* Overall helps promote good code that will be managable


---
class: center, middle
# Demonstration

???
* [run lint]
* [run test]
* [remove semicolon]
* [fail lint]
* [comment out function]
* [fail test]


---
class: center, middle
# Automating the Boring Bits

???
* Can lint and run tests
* Will be tedious on every pull request
* CI service helps


---
# Continous Integration Service

* Executes commands for us
  - Testing, deployment, regular chores
* Can create automation around events
* Generally run Linux or Docker images

???
* Platform that runs commands around events
  - "when this happens, run these commands"
* If a command (like tests) has non-zero status (fails), we'll be notified


---
# Travis CI

* Free for open source projects
* GitHub only
* Easy to set up and use
* Can build MacOS projects

???
* This talk uses Travis CI
* Pros
  - Easy to get started with
  - Free for open source projects
  - Uses your Github account
  - Good for personal projects
* Cons
  - Github only
  - Private projects / paid plan can get pricy


---
# Alternative CI Services

* Cloud Hosts
  - Appveyor
  - Circle CI
  - Semaphore
* Open Source (self hosted)
  - Jenkins
* Not Standalone
  - Gitlab
  - Bitbucket

???
* Conceptually applies to different CI services
* More cloud like and similar to Travis
  - Appveyor
  - Circle CI
  - Semaphore
* Jenskins
  - Open source
  - Self hosted
  - Powerful
  - Common
* Gitlab and Bitbucket offer CI service through them
  - Gitlab's is nice


---
# Travis File

* YAML file
* Like a script describing what to do
* `.travis.yml` in root of repo

???
* Need a file called `.travis.yml` to use
* Describes the project to Travis
* Lists what commands to run at what step


---
# `.travis.yml`

```yml
*language: node_js
```

???
* Want to run tests on pull request
* Set language to node since this is a JS project
* Just a preset 
* Can use other languages


---
# `.travis.yml`

```yml
language: node_js
*node_js:
* - "8"
```

???
* Customize node preset to use version 8
* Could add more versions to test against


---
# `.travis.yml`

```yml
language: node_js
node_js:
  - "8"
*install:
* - cd todo
* - npm install
```

???
* Customize the install step
* Default runs `npm install`
* Needed to change dir


---
# `.travis.yml`

```yml
language: node_js
node_js:
  - "8"
install:
 - cd todo
 - npm install
*script:
* - npm run lint
* - npm test
```

???
* Customize build process with script
* Default runs `npm test`
* Changed to add lint
* Stays in dir from install


---
# Deploying to GitHub releases

```sh
gem install travis
# protip: use rvm
```

???
* Install Travis CLI Ruby gem
  - Makes this easier


--

```sh
# in same dir as .travis.yml
travis setup releases
```

???
* Answer prompts
* Adds necessary stuff to travis file


---
# `.travis.yml`

```yml
# ...
deploy:
  provider: releases
  api_key:
    secure: ENCRYPTED_API_KEY
  file: build.zip
  on:
    repo: NRauh/devops-talk
```

???
* Added deploy to travis file
* Will add build.zip to releases
* Repo will make it so only your repo will trigger
* A GitHub API key will be generated and encrypted
  - Will only be valid for your repo


---
# `.travis.yml`

```yml
# ...
*before_deploy:
* - npm run build
* - zip -r build.zip build/*
deploy:
  provider: releases
  api_key:
    secure: ENCRYPTED_API_KEY
  file: build.zip
* skip_cleanup: true
  on:
    repo: NRauh/devops-talk
```

???
* `build.zip` doesn't exist, so we must create it
* Before deploy
  - Build project
  - Zip build
* Skipping cleanup to preserve the zip file


---
# `.travis.yml`

```yml
# ...
before_deploy:
  - npm run build
  - zip -r build.zip build/*
* - git config --local user.name "Nate Rauh"
* - git config --local user.email "NRauh@users.noreply.github.com"
* - git tag "$(date +'%Y%m%d%H%M%S')-$(git log --format=%h -1)"
deploy:
  provider: releases
  api_key:
    secure: ENCRYPTED_API_KEY
  file: build.zip
  skip_cleanup: true
  on:
    repo: NRauh/devops-talk
*   branch: master
```

???
* GitHub releases works around tags
* Create a new tag automatically
  - No requirement to do it this way
* Will build twice
  - Branch (deploy)
  - Tag


---
class: center, middle
# Adding Project in Travis

???
* File already pushed
* In Travis
  - Search for project
  - Activate
  - Watch run
* Will show pull request soon
* Create PR


---
# Terraform

* Creates provisions of services
* Manages the settings of provisions
* Open source created by Hashicorp
  - Enterprise edition available

???
* Can add code easily, now need to deploy
* Terraform can help create something to deploy to
* Terraform
  - Manage infrastructure and services through declarative code
  - Can work with AWS, Google Cloud, Azure, etc
  - Extendable
* Like AWS Cloud Formation but open source, and not vendor specific


---
# Creating a Droplet

```hcl
# webserver.tf
```

???
* Want to create DigitalOcean Droplet to host todo app
  - Pretty trivial
* Hopefully illustrates use with many services or intricate setup
* In `webserver.tf`


---
# Creating a Droplet

```hcl
# webserver.tf
*variable "do_token" { }

*provider "digitalocean" {
* token = "${var.do_token}"
*}
```

???
* Setting digital ocean API key


---
# Creating a Droplet

```hcl
# webserver.tf
variable "do_token" { }

provider "digitalocean" {
  token = "${var.do_token}"
}

*resource "digitalocean_droplet" "todo-droplet" {
* image = "ubuntu-16-04-x64"
* name = "todo"
* region = "nyc3"
* size = "1gb"
* ssh_keys = ["42:cb:c1:a3:ff:8a:4d:4d:3b:f8:e8:47:06:89:86:50"]
*}
```

* [ssh key already in DigitalOcean, and will be unique]

???
* Add droplet resource
* Configuring what the droplet
* What you can configure depends on your resource
  - An EC2 instance will have more things than a Droplet
* Already have an SSH key in DigitalOcean
  - Can use Terraform to add keys


---
# Using Terraform

1. `terraform init`
  - Initialize project
2. `terraform plan`
  - Essentially a dry run
  - Need to run before making changes
3. `terraform apply`
  - Apply changes after reviewing
4. `terraform destroy`
  - Remove provisions

???
* Wont go through these for the sake of time
* To use Terraform you would
  - Initialize the project
  - Run plan to see what's going to change
  - Run apply when your changes are correct
  - When you want to you can destroy the provisions

---
# Terraform State (`terraform.tfstate`)

* Can contain confidential information about your resources
  - Don't commit (especially for public repos)
* Terraform "backends"
  - Store remotely (like S3), pull down when needed
  - Enterprise version comes with remote hosting

???
* Terraform will create `terraform.tfstate`
* Can have stuff we don't want to share
* Recommended to store remotely
  - Enterprise version can help


---
# Additional Terraform Things

* Import existing provisions
* Remove or import drift

???
* Ability to import existing stuff
  - Doesn't know what's default, but helps transition
* Track drift
  - See if a setting has changed outside of Terraform
  - Decide to import or remove changes


---
# Ansible

* Configuration management tool
  - Handles errors for us
  - Doesn't do what doesn't need to be done
  - Create templates of config files
  - Modular tasks
* Automate tasks done on a server
* Open source created by RedHat
  - Enterprise edition available

???
* Ansible will help with configuration management
* Like writing a shell script but scales better
  - Better error handling
  - Doesn't do things that aren't needed
  - Create templates out of configuration files
  - Create modular and reusable tasks
* Can also run maintness stuff
* Like Chef or Puppet
  - Ansible is more simple


---
# Structure (for todo app)

* `hosts` - Names and address of servers
* `todo-config.yml` - Playbook of tasks
* [More complex configuration will have a larger structure]

???
* Two files
  - Hosts file which has the IP address of the server
  - Todo config yaml file is the playbook
* Playbook
  - A series of tasks that make up the configuration


---
# Web Server Tasks

1. Connect to droplet
2. Install Python 2
  - Required for most Ansible tasks
3. Install Nginx
4. Download release of todo app
5. Unzip to `/var/www/html`

???
* Won't go into too much detail
* High level
  - Need to connect (over SSH)
  - Install Python 2 and Nginx
  - Download the release
  - Unzip it to correct directory
