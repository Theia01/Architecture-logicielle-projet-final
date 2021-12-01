#!/bin/bash
cd microservices/
node game_microservice.js &
node login_microservice.js &
node stat_microservice.js