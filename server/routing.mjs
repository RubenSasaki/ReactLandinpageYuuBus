export const dynamicRoute = {
  src: '/(rutas(?:/.*)?|eventos(?:/.*)?|routes-preview\\.json|events-preview\\.json|route-stats\\.json)',
  dest: '/api/catalog?catalogPath=$1',
};
export function dynamicConfig(original) {
  const config = structuredClone(original);
  config.routes.splice(config.routes.findIndex(r=>r.handle==='filesystem'),0,dynamicRoute);
  return config;
}
