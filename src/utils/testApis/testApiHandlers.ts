import { rest } from 'msw'

const BASE_URL = process.env.NEXT_PUBLIC_BASE || ""

export const initalTodos = [
	{
		"id": 1,
		"task": "write tests"
	},
	{
		"id": 2,
		"task": "make the storybook"
	}
]

export const initial_fetchTodos_success = rest.get(BASE_URL, async (req, res, ctx) =>
	res(
		ctx.status(200),
		ctx.json(initalTodos)
	)
)

export const fetchTodos_fail = rest.get(BASE_URL, async (req, res, ctx) =>
	res(ctx.status(400, 'failed to fetch'))
)

export const handlers = [initial_fetchTodos_success, fetchTodos_fail]