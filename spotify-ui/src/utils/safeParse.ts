const safeParse = (json: string, defaultTo?: any) => {
  try {
    const parsed = JSON.parse(json);
    return parsed;
  } catch (error) {
    return defaultTo ?? null
  }
}

export default safeParse;