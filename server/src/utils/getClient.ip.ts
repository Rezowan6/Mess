export const getClientIp = (req: any) => {
  return (
    req.headers["x-forwarded-for"]?.toString()?.split(",")[0] ||
    req.socket.remoteAddress ||
    null
  );
};