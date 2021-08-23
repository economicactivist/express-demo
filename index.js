const express = require('express')
const Joi = require('joi')
const app = express()
const port = process.env.PORT || 3000


app.use(express.json()) 

name_schema = Joi.object().keys({
    name: Joi.string().min(3).required()
})


const validate = (schema, data) => {

    const result = schema.validate(data)
    if (result.error) {
        return result.error.details[0].message  // return the first error message
    }
    return null
}


const courses = [   // array of objects
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/courses', (req, res) => {
  res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
  
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if(!course) return res.status(404).send('The course with the given ID was not found')
  res.send(course)


})

app.post('/api/courses', (req, res) => {
 

    const validationError = validate(name_schema, req.body)
    if (validationError) {
        res.status(400).send(validationError)
        return
    }  // if validation error, return 400 and send the error message
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course)
    res.send(course) //so the client can get the id of the new course
})

app.put('/api/courses/:id', (req, res) => {
    //look up the course
    //if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')

    //validate
    //if invalid, return 400 - bad request
    const validationError = validate(name_schema, req.body)
    if (validationError) {
        res.status(400).send(validationError)
        return
    }

    //update course
    course.name = req.body.name

    //return the updated course
    res.send(course)
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found')
    
    const index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)
})






    // export PORT = 5000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
