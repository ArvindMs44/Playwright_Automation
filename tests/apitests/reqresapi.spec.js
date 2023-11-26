const { test, expect } = require('@playwright/test');

test('@API TEST GET REQUEST', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2')
    const responsejson = await response.json()
    expect(response.status()).toBe(200)
    expect(responsejson).toHaveProperty('data.email', 'janet.weaver@reqres.in');
    expect(responsejson).toHaveProperty('support.text', 'To keep ReqRes free, contributions towards server costs are appreciated!');
    console.log('TEST GET REQUEST PASSED')
});


test('@API TEST DELETE REQUEST', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/2')
    expect(response.status()).toBe(204)
    console.log('TEST DELETE REQUEST PASSED')
 });

test('@API TEST POST REQUEST', async ({ request }) => {

    const response = await request.post('https://reqres.in/api/users', {
        data: {
          name: "morpheus",
          job: "leader"
        }
    });

    const responsejson = await response.json()
    expect(response.status()).toBe(201)
    expect(responsejson).toHaveProperty('name', 'morpheus');
    expect(responsejson).toHaveProperty('job', 'leader');
    console.log('TEST POST REQUEST PASSED')
});

test('@API TEST PATCH REQUEST', async ({ request }) => {

    const response = await request.patch('https://reqres.in/api/users/2', {
        data: {
          name: "morpheus",
          job: "zion resident"
        }
    });

    const responsejson = await response.json()
    expect(response.status()).toBe(200)
    expect(responsejson).toHaveProperty('name', 'morpheus');
    expect(responsejson).toHaveProperty('job', 'zion resident');
    console.log('TEST PATCH REQUEST PASSED')
});