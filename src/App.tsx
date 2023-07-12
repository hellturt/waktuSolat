import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event"
import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import "./App.scss";
import { Landing } from './components/Landing'
import { TimingList } from './components/TimingList'

const App: React.FC = () => {
  const [greetMsg, setGreetMsg] = useState("");
  const [config, setConfig] = useState<Config>({
    code: '',
    zone: '',
    state: ''
  })
  const [showLanding, setShowLanding] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  listen('reset_location', () => {
    setShowLanding(true)
  })


  useEffect(() => {
    findConfig()
  }, [])

  const findConfig = async () => {
    try {
      const config = await readTextFile('config.json', { dir: BaseDirectory.AppConfig });
      setConfig(JSON.parse(config))
      setShowLanding(false)
    } catch (err) {
      invoke('close_splashscreen')
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return null

  return (
    (config.code === '' || showLanding) ? (
      <Landing
        setConfig={setConfig}
        showLanding={showLanding}
        setShowLanding={setShowLanding}
      />
    ) : (
      <TimingList
        config={config}
        setShowLanding={setShowLanding}
      />
    )
  );
}

interface Config {
  code: string;
  zone: string;
  state: string;
}

export default App;
