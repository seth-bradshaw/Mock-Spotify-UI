const safeParse = (json: string|null|undefined, defaultTo?: any) => {
  try {
    /* @ts-ignore */
    const parsed = JSON.parse(json);
    return parsed;
  } catch (error) {
    return defaultTo ?? null
  }
}

export default safeParse;