const request = require("supertest");
const app = require("./config/app");
const User = require("../models/userModel");
const {
  userOne,
  userTwo,
  userOneId,
  userTwoId,
  setupDataBase,
} = require("./fixtures/db");

beforeEach(setupDataBase);
test("Debe permitir el login de un usuario existente", async () => {
  const response = await request(app)
    .post("/user/loginTest")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(response.body.msg).toBe("Login success!");
});

test("Debe rechazar el login de un usuario no existente", async () => {
  await request(app)
    .post("/user/loginTest")
    .send({
      email: userOne.email,
      password: "wrongpass",
    })
    .expect(400);
});

test("Debe permitir obtener informacion del usuario", async () => {
  const response = await request(app).post("/user/loginTest").send({
    email: userOne.email,
    password: userOne.password,
  });
  const res = await request(app)
    .get("/user/infor")
    .set("Authorization", `${response.body.newToken}`)
    .send()
    .expect(200);

  expect(res.body.user).not.toBeNull();
});

test("Administrador debe poder borrar cuentas de usuario", async () => {
  const response = await request(app).post("/user/loginTest").send({
    email: userOne.email,
    password: userOne.password,
  });
  await request(app)
    .delete(`/user/delete/${userTwoId}`)
    .set("Authorization", `${response.body.newToken}`)
    .send()
    .expect(200);

  //assert that user was deleted from the database
  const user = await User.findById(userTwoId);
  expect(user).toBeNull();
});

test("Usuario sin permisos de admin no puede borrar cuentas de otros usuarios", async () => {
  const response = await request(app).post("/user/loginTest").send({
    email: userTwo.email,
    password: userTwo.password,
  });

  await request(app)
    .delete(`/user/delete/${userTwoId}`)
    .set("Authorization", `${response.body.newToken}`)
    .send()
    .expect(500);
});

/*
test("Should get user profile", async () => {
    await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test("Should not get user profile without authentication", async () => {
    await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
    await request(app)
        .delete("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    //assert that user was deleted from the database
    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test("Should not delete account for user without authentication", async () => {
    await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
    await request(app)
        .post("/users/me/avatar")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .attach("avatar", "tests/fixtures/profile-pic.jpg")
        .expect(200);

    //  assert if a buffer is stored
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
    const response = await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Joe",
        })
        .expect(200);

    //  assert if data did change
    const user = await User.findById(userOneId);
    expect(user.name).toEqual("Joe");
});

test("Should not update invalid user fields", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: "mexico",
        })
        .expect(400);
});

test("Should not sign up user with invalid email", async () => {
    const response = await request(app)
        .post("/users")
        .send({
            name: "joe",
            email: "joe.dfsi",
        })
        .expect(400);

    //  assert user is not in database
    const user = await User.findById(response.body._id);
    expect(user).toBeNull();
});

test("Should not update user if unauthenticated", async () => {
    await request(app)
        .patch("/users/me")
        .send({
            name: "john",
        })
        .expect(401);
});

test("Should not update user with invalid email", async () => {
    await request(app)
        .patch("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            password: "password",
        })
        .expect(404);
});

test("Should not delete user if unauthenticated", async () => {
    const response = await request(app).delete("/users/me").send().expect(401);
});
*/
