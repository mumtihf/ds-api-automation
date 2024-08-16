const request = require('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs');

const assert = chai.assert;
const BASE_URL = "https://reqres.in/";

describe('API Test for "reqres.in"', () => {
    it('GET', async () => {
        const response = await request(BASE_URL)
            .get('api/users/2')

        const schemaPath = "resource/jsonSchema/get-object-jsonschema.json";
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

        //Assertion Status Code & Response Data
        assert.equal(response.statusCode, 200);
        assert.equal(response.body.data.id, 2);
        assert.equal(response.body.data.email, "janet.weaver@reqres.in");
        assert.equal(response.body.data.first_name, "Janet");
        assert.equal(response.body.data.last_name, "Weaver");
        assert.equal(response.body.data.avatar, "https://reqres.in/img/faces/2-image.jpg");

        //Assert JsonSchema
        assert.jsonSchema(response.body, jsonSchema);
    });

    it('POST', async () => {
        const body = {
            "name": "morpheus",
            "job": "leader"
        }

        const response = await request(BASE_URL)
            .post('api/users')
            .send(body)

        const schemaPath = "resource/jsonSchema/post-object-jsonschema.json";
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    
        //Assertion Status Code & Response Data
        assert.equal(response.statusCode, 201);
        assert.equal(response.body.name, "morpheus");
        assert.equal(response.body.job, "leader");
    
        //Assert JsonSchema
        assert.jsonSchema(response.body, jsonSchema);
    });

    it('PUT', async () => {
        const body = {
            "name": "morpheus",
            "job": "zion resident"
        }

        const response = await request(BASE_URL)
            .put('api/users/2')
            .send(body)

        const schemaPath = "resource/jsonSchema/put-object-jsonschema.json";
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    
        //Assertion Status Code & Response Data
        assert.equal(response.statusCode, 200);
        assert.equal(response.body.name, "morpheus");
        assert.equal(response.body.job, "zion resident");

        //Assert JsonSchema
        assert.jsonSchema(response.body, jsonSchema);
    });

    it('DELETE', async () => {
        const response = await request(BASE_URL)
            .delete('api/users/2')
        
         //Assertion Status Code
         assert.equal(response.statusCode, 204);
    });
});
