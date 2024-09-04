const z = require("zod");

const signupValidate = z.object({
	username: z.string().email(),
	firstName: z.string(),
	lastName: z.string(),
	password: z.string()
})

const siginValidate = z.object({
 username:z.string().email(),
 password: z.string()
})

const updateValidate = z.object({
	firstname:z.string().optional(),
	lastname: z.string().optional(),
	password:z.string().optional()
   })

module.exports={
    signupValidate,
	siginValidate,
	updateValidate
}