import { useState, useEffect, useRef } from 'react'
import "./App.css"
import Footer from './components/Footer'
import Window from './components/Window'
import { fileSystem } from './filesystem/filesystem';
import type { Directory, File } from './filesystem/filesystem';
import CommandMenu from './components/CommandMenu'
import { appRegistry } from './apps/registery'
import Notification from "./components/Notification";
import { EffectExecutor } from './happiness/execute';
import { HorrorAction, HorrorController } from './happiness/happinessController';
import { playSound } from './audio/soundHandler';
import { Eye } from 'lucide-react';
import { horrorEvents } from './happiness/events';
import StartupScreen from './StartupScreen';


export interface WindowState {
    minimized: boolean;
    maximized: boolean;
    title?: string;
}

const addFileToPath = (
    directory: Directory,
    pathParts: string[],
    file: File
): Directory => {
    if (pathParts.length === 0) {
        return {
            ...directory,
            files: [...directory.files, file]
        };
    }

    const [nextDirectory, ...remaining] = pathParts;

    return {
        ...directory,
        directories: directory.directories.map(dir =>
            dir.name === nextDirectory
                ? addFileToPath(dir, remaining, file)
                : dir
        )
    };
};

const App = () => {
    const [starting, setStarting] = useState(true);
    const [background, setBackground] = useState("/background.jpeg")
  const [commandOpen, setCommandOpen] = useState(false);
  const [browserUrl, setBrowserUrl] = useState("home")
    const [horrorLevel, setHorrorLevel] = useState(0);
  const [vulpHorrorMes, setVulpHorrorMes] = useState<string | null>(null);
  const [windows, setWindows] = useState<Record<string, WindowState>>({});
  const [systemEvents, setSystemEvents] = useState<
        {
            type: string;
            description: string;
        }[]
    >([]);
  const [apps, setApps] = useState(appRegistry);
  const [notification, setNotification] = useState<{ title: string; description?: string; } | null>(null);
  const [iconOverride, setIconOverride] = useState<Record<string, string>>({});

  const horror = useRef(
      new HorrorController(
          {
            level: 0,
            eventsSeen: [],
            appsOpened: 0,

            terminalUsed: false,
            filesUsed: false,
            notesUsed: false,
            vulpQuestioned: false,

            sessionTime: 0,

            windowsOpened: 0,
            actionsSinceLastEvent: 0
        },
          horrorEvents
      )
  );

  const effectExecutor = useRef(
      new EffectExecutor({
          showNotification: (message) => {
              setNotification({
                  title: "VulpeculaOS",
                  description: message
              });

            setSystemEvents(prev => [
                ...prev,
                {
                    type: "NOTIFICATION",
                    description: message
                }
            ])
          },
          changeTitle: (appId, title) => {
            setWindows(prev => ({
                ...prev,
                [appId]: {
                    ...prev[appId],
                    title
                }
            }))
          } ,
          changeBackground: (src) => {
            setBackground(src)
          },
          playSound: (sound) => {
            playSound(sound);
          },
          createUnknownApp: (appId, newAppName) => {
                setApps(prev => [
                    ...prev,
                    {
                        id: appId,
                        name: newAppName,
                        installed: true,
                        builtIn: false,
                        icon: {
                            type: "lucide",
                            icon: Eye
                        }
                    }
                ]);
            },
          createUnknownWebsite: (url) => {
            setBrowserUrl(url)
            openApp("browser")
          },
          createNewFile: (path, content = "") => {
                const parts = path.split("/").filter(Boolean);
                const fileName = parts.pop();

                if (!fileName) return;

                setFilesystem(prev =>
                    addFileToPath(prev, parts, {
                        name: fileName,
                        content
                    })
                );
            },
          changeIcon: (appId, src) => {
            setIconOverride(prev => ({
                ...prev,
                [appId]: src
            }))
          },
          vulpResponse: (message) => {
            setVulpHorrorMes(message)
          },
          increaseLevel: () => { horror.current.increaseLevel();
            setHorrorLevel(horror.current.getLevel());
          },
          openWindow: (appId) => {
            setWindows(prev => ({
                ...prev,
                [appId]: {
                    minimized: false,
                    maximized: false,
                }
            }));

            setSystemEvents(prev => [
                ...prev,
                {
                    type: "WINDOW_OPENED",
                    description: `${appId} was opened by the ~~entity~~ system`
                }
            ])
          }
      })
  );

  const recordHorrorAction = (action: HorrorAction) => {
    const effects = horror.current.recordAction(action);

    effectExecutor.current.executeAll(effects);
  };

  const installApp = (appId: string) => {
      setApps(prev =>
          prev.map(app =>
              app.id === appId
                  ? { ...app, installed: true }
                  : app
          )
      );
  };

  const openApp = (app: string) => {
      setWindows(prev => ({
          ...prev,
          [app]: {
              minimized: false,
              maximized: false,
              title: undefined
          }
      }));

      setSystemEvents(prev => [
        ...prev,
        {
            type: "WINDOW_OPENED",
            description: `${app} was opened by the user.`
        }
    ]);

      switch (app) {
          case "terminal":
              recordHorrorAction("OPEN_TERMINAL");
              break;

          case "files":
              recordHorrorAction("OPEN_FILES");
              break;

          case "notes":
              recordHorrorAction("OPEN_NOTES");
              break;

          case "vulp":
              recordHorrorAction("OPEN_VULP");
              break;
      }
  };
  
  const closeApp = (app: string) => {
    setWindows(prev => {
      const next = { ...prev };
      delete next[app]
      return next
    })
  }

  const [filesystem, setFilesystem] = useState<Directory>(fileSystem)

  useEffect(() => {
        const timer = setInterval(() => {
            const effects = horror.current.updateSessionTime(1);

            effectExecutor.current.executeAll(effects);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

  useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
          if (event.ctrlKey && event.shiftKey && event.key === "Space") {
              setCommandOpen(prev => !prev);
          }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
          window.removeEventListener('keydown', handleKeyDown);
      };
  }, []);

  const renderApp = (appId: string) => {
      const app = apps.find(app => app.id === appId);

      if (!app || !app.component) {
          return null;
      }

      return app.component({
            filesystem,
            setFilesystem,
            apps,
            installApp,
            windows,
            systemEvents,
            vulpHorrorMes,
            horrorLevel,
            url: browserUrl,
            onAction: (action) => {
                if (action === "OPEN_TERMINAL") {
                    openApp("terminal");
                }

                if (action === "OPEN_FILES") {
                    openApp("files");
                }

                if (action === "OPEN_NOTES") {
                    openApp("notes");
                }
            }
        });
  };

  if (starting) {
        return (
            <StartupScreen onComplete={() => setStarting(false)} />
        )
    }
  return (
    <div>
      <img src={background} className="background"/>
      <div className="app-icons">
        {apps.map((actualApp) => {
          if (actualApp.installed === true) {
            return (
              <button key={actualApp.id} onClick={() => { openApp(actualApp.id); playSound("click"); }}>
                {iconOverride[actualApp.id] ? (
                    <img
                        src={iconOverride[actualApp.id]}
                        width={30}
                        height={30}
                    />
                ) : actualApp.icon.type === 'lucide' ? (
                    <actualApp.icon.icon />
                ) : (
                    <img
                        src={actualApp.icon.src}
                        width={30}
                        height={30}
                    />
                )}
                <span>{actualApp.name}</span>
              </button>
            );
          }
        })}
      </div>
      {Object.entries(windows).map(([appId]) => {
        const app = apps.find(app => app.id === appId);

        if (!app || !app.component) {
          return null;
        }

        return (
          <Window
            key={appId}
            title={windows[appId].title ?? app.name}
            icon={
              app.icon.type === "lucide"
                ? <app.icon.icon />
                : <img src={app.icon.src} width={30} height={30} />
            }
            onClose={() => { closeApp(appId); playSound("close") }}
          >
            {renderApp(appId)}
          </Window>
        );
      })}
      {notification && (
          <Notification
              title={notification.title}
              description={notification.description}
              onClose={() => setNotification(null)}
          />
      )}
      <CommandMenu open={commandOpen} onOpenFiles={() => { openApp('files'); setCommandOpen(false); playSound("click") }} onOpenNotes={() => { openApp('notes'); setCommandOpen(false); playSound("click") }} onOpenTerminal={() => { openApp('terminal'); setCommandOpen(false); playSound("click") }} onOpenBrowser={() => {openApp('browser'); setCommandOpen(false); playSound("click") }} onOpenStore={() => {openApp('store'); setCommandOpen(false); playSound("click") }} onOpenVulp={() => {openApp('vulp'); setCommandOpen(false); playSound("click") }} />
      <Footer openFiles={() => {openApp('files'); playSound("click")}} openTerminal={() => {openApp('terminal'); playSound("click")}} openNotes={() => {openApp('notes'); playSound("click")}} openVulp={() => {openApp('vulp'); playSound("click")}} openCommand={() => {setCommandOpen(!commandOpen); playSound("click")}} openBrowser={() => {openApp('browser'); playSound("click")}} openStore={() => {openApp('store'); playSound("click")}} />
    </div>
  )
}

export default App
