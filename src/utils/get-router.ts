export default function getRouter(context) {

  if (!context || !context.__owner__) {
    throw new Error('Could not find the router on the given context');
  }

  return context.__owner__.router;
}