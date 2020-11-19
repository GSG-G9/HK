# HK Application

Visit this [Link](https://hk-autocomplete.herokuapp.com/) to view our App

### Team members:-

- Khamis
- Hassan

---

### Purpose

This Website make a word autocomplete - it's search in a big file (235887 word) - you can download it form [here](https://github.com/dwyl/autocomplete/blob/master/words.txt)

### What you will find here :-

#### Main Page

Here You will find an input field,you can type any word and have an autocomplete for it- it's search in many english words.
You can hover over the result to autocomplete your word and click to search again for your choice and the end you can sumbit your choice to continue.

### How We Do this :-

#### Design

We Agreed to put an input filed and sumbit button only with nice style.

#### Work
We make the following work plan :-
# File Structure :-
.gitignore
### public folder
  - html
  - css
  #### js folder
  - request.js
  - dom.js
### test folder
  - test.js
### src folder
  - router.js
  - server.js
  #### handler folder
  - handler.js
  #### data folder
  - word.txt

### heroku setup
### npm init
### npm i -D jest,eslint,supertest
----------
### html Structure - CSS file 
  - input
  - form
----------
### js folder Structure
  -request
    - xhr function (url,callback) - First Error Callback
  - dom
    - select input/id and form/id
    - addEventListener('input',()=>{})
    - debounce()
----------
### HandleSearch function
  - Test
  - Function
  - handleSearch(word,listArray) 
  take ward and words list:array and using filter function to find the result
  return JSON.stringify(result)
----------
### ReadFile function (html - css - js - txt)
  - function
  - input(url,callback)
  - write path.join - fs.readFile 
----------
### HandleFiles function (router)
  - function
  - handle html-css-js
  - content-type 
  - handleFiles(req,res,url,errorBack) - res.end(file)
----------
### Router file
 - Function
 - routers ("/" , "api/search" , 404 , 500)
 - export
----------

### Server file
  - PORT
  - HOST
  - http / createServer / listen 
----------
### Readme file
  - Team Member
  - Why 
  - What
  - How
----------
### Function showDataInPage
  - Make function to manage display in frontend in pages when data length more than specific number

### User story

As a Customer looking to help me in a word autocomplete 

> I want to visit your site and immediately see a an input filed

As a Customer looking autocomplete a word

> I want to type a word and then i want to choose the result and search again


### Stretch Goals :-

1. Making more css animation to be more professional.
2. Add some effects to navbar with a flip background
3. Make nicer design for input data
4. make another api call for the result.
5. using some advance methods to optimize requests based on time like debounce function
