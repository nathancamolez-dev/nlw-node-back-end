import fastify from "fastify";
import {jsonSchemaTransform, serializerCompiler , validatorCompiler } from "fastify-type-provider-zod"
import { registerEvent } from "./http/routes/registerEvent";
import { getEvent } from "./http/routes/get-event";
import { registerUser } from "./http/routes/registerUser";
import { getAttendeeBadge } from "./http/routes/get-attendees-badge";
import { checkIn } from "./http/routes/check-in";
import { getEventAttendees } from "./http/routes/getEventAttendees";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { errorHandler } from "./errors/error-handler";
import fastifyCors from "@fastify/cors";

export const app = fastify()

app.register(fastifyCors, {
    origin: '*' 
})


app.register(fastifySwagger,{
    swagger:{
        consumes:['application/json'],
        produces:['application/json'],
        info:{
            title: 'pass-in',
            description: 'Api Documentation for back-end',
            version: '1.0.0'
        }
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi,{
    routePrefix: '/docs'
})


app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(registerEvent)

app.register(getEvent)

app.register(registerUser)

app.register(getAttendeeBadge)

app.register(checkIn)

app.register(getEventAttendees)


app.setErrorHandler(errorHandler)