import {
  checkIn
} from "./chunk-G3HH5C6X.mjs";
import {
  getAttendeeBadge
} from "./chunk-T3ND2UJC.mjs";
import {
  getEvent
} from "./chunk-BOALKHWB.mjs";
import {
  getEventAttendees
} from "./chunk-3XXMPWGE.mjs";
import {
  registerEvent
} from "./chunk-P432Q2FH.mjs";
import {
  registerUser
} from "./chunk-JVS5P5JB.mjs";
import {
  errorHandler
} from "./chunk-QOMOKVTN.mjs";

// src/app.ts
import fastify from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass-in",
      description: "Api Documentation for back-end",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(registerEvent);
app.register(getEvent);
app.register(registerUser);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);

export {
  app
};
