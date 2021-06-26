import { api } from "./_api";
import type { RequestHandler } from "@sveltejs/kit";
import type { ILocals } from "$lib/types";

// PATCH /todos/:uid.json
export const patch: RequestHandler<ILocals, FormData> = async (request) => {
  return api(request, `todos/${request.locals.userid}/${request.params.uid}`, {
    text: request.body.get("text"),
    done: request.body.has("done") ? !!request.body.get("done") : undefined,
  });
};

// DELETE /todos/:uid.json
export const del: RequestHandler<ILocals> = async (request) => {
  return api(request, `todos/${request.locals.userid}/${request.params.uid}`);
};
