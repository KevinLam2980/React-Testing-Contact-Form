export default {
    post: jest.fn().mockResolvedValue({
        data: {
            "firstName": "Kevin",
            "lastName": "Lam",
            "email": "kev2980@gmail.com",
            "message": "This be an message",
        }
    })
}