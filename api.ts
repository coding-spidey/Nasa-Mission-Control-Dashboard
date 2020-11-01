import { Router } from "./deps.ts";
import * as planets from "./model/planets.ts";
import * as launches from "./model/launches.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = `
    {___     {__      {_         {__ __        {_       
    {_ {__   {__     {_ __     {__    {__     {_ __     
    {__ {__  {__    {_  {__     {__          {_  {__    
    {__  {__ {__   {__   {__      {__       {__   {__   
    {__   {_ {__  {______ {__        {__   {______ {__  
    {__    {_ __ {__       {__ {__    {__ {__       {__ 
    {__      {__{__         {__  {__ __  {__         {__
                    Mission Control API`;
});

router.get("/planets", (ctx) => {
  ctx.response.body = planets.getPlanetData();
});

router.get("/launches", (ctx) => {
  ctx.response.body = launches.getAll();
});

router.get("/launches/:id", (ctx) => {
  if (ctx.params?.id) {
    const launchData = launches.getOne(Number(ctx.params.id));
    if (launchData) {
      ctx.response.body = launchData;
    } else {
      ctx.throw(400, "Launch with that ID doesn't exist");
    }
  }
});

router.post("/launches", async (ctx) => {
  const body = await ctx.request.body();

  launches.addOne(body.value);

  ctx.response.body = { success: true };
  ctx.response.status = 201;
});

router.delete("/launches/:id", (ctx) => {
  if (ctx.params?.id) {
    const result = launches.removeOne(Number(ctx.params.id));
    ctx.response.body = { success: result };
  }
});

export default router;
