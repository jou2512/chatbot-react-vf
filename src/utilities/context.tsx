import { useRuntime } from '@voiceflow/react-chat';
import { createContext, useMemo } from 'react';

export interface RuntimeEvents {
  //live_agent: (platform: LiveAgentPlatform) => void;
}

export interface RuntimeContextValue {
  runtime: ReturnType<typeof useRuntime>;
}

export const RuntimeContext = createContext<RuntimeContextValue | null>(null);

export const RuntimeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const apiKey: string | undefined = process.env.VF_DM_API_KEY;

  if (apiKey === undefined) {
    throw new Error("VF_DM_API_KEY is not defined");
  }

  const runtime = useRuntime({
    verify: { authorization: apiKey },
    session: { userID: `anonymous-${Math.random()}` },
    traces: [],
  });

  return <RuntimeContext.Provider value={{ runtime }}>{children}</RuntimeContext.Provider>;
};
