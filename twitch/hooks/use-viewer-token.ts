import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode} from "jwt-decode";
import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity:string) => {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");

useEffect(() => {
  const createToken = async () => {
    try {
    // (debug) createViewerToken 에 오류가 떴던 이유는, user-service.ts 의 getUserById 함수에 오타가 나서 
    // token.ts 의 함수인 createViewerToken에도 오류가 생긴 것, getUserById는 createViewerToken 함수의 메소드 이다.
      const viewerToken = await createViewerToken(hostIdentity);
      setToken(viewerToken);

      const decodedToken = jwtDecode(viewerToken) as JwtPayload & { name?: string }
      const name = decodedToken?.name;

      const identity = decodedToken.jti;

      if (identity){
        setIdentity(identity); 
      }

      if(name){
        setName(name);
      }
    } catch {
      toast.error("토큰을 생성할 수 없습니다.");
    }
  }

    createToken();
}, [hostIdentity]);

return { token, identity, name };
};