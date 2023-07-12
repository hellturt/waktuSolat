import { useState, useEffect } from "react";
import Select from 'react-select';
import { fs } from '@tauri-apps/api'
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
import { appDataDir } from '@tauri-apps/api/path';
import { BaseDirectory, writeTextFile } from "@tauri-apps/api/fs";
import { STATE_LIST, LOCATION_LIST } from '../../const'
import './style.scss'

interface Option {
    value: string;
    label: string;
}

const Landing: React.FC<LandingProps> = ({ setConfig, showLanding, setShowLanding }) => {
    const [negeri, setNegeri] = useState<Option | null>({ label: 'Select State', value: '' })
    const [location, setLocation] = useState<Option | null>({ label: 'Select Location', value: '' })

    const handleNegeriSelect = (selected: Option | null) => {
        setNegeri(selected)
    }

    const handleLocationSelect = (selected: Option | null) => {
        setLocation(selected)
    }

    const saveData = async () => {
        if (!negeri || !location) return
        try {
            const appConfigDirPath = await appDataDir();
            const folderExists = await fs.exists(appConfigDirPath)

            if (!folderExists) {
                await fs.createDir(appConfigDirPath);
                console.log('App folder created successfully.');
            } else {
                console.log('App folder already exists.');
            }

            await writeTextFile("config.json", JSON.stringify({
                state: negeri.value,
                zone: location.label,
                code: location.value
            }), { dir: BaseDirectory.AppConfig })

            setConfig({
                state: negeri.value,
                zone: location.label,
                code: location.value
            })
            setShowLanding(false)

            let permissionGranted = await isPermissionGranted();
            if (!permissionGranted) {
                const permission = await requestPermission();
                permissionGranted = permission === 'granted';
            }

            if (permissionGranted) {
                sendNotification({ title: 'Waktu Solat', body: 'Location saved.' });
            }
            console.log('Settings file saved successfully.');
        } catch (error) {
            console.log(error);
            console.error('Error saving settings file:', error);
        }
    }

    const resetData = () => {
        setNegeri({ label: 'Select State', value: '' })
        setLocation({ label: 'Select Location', value: '' })
    }

    const cancelReset = () => { setShowLanding(false) }

    useEffect(() => {
        setLocation({ label: 'Select Location', value: '' })
    }, [negeri])

    return (
        <div className="container location-container">
            {showLanding ? <h1>Reset your location</h1> : <h1>Welcome to Waktu Solat App</h1>}
            <Select
                className="state-select"
                classNamePrefix="select"
                value={negeri}
                isSearchable={false}
                name="negeri"
                options={STATE_LIST.map(n => ({ label: n, value: n }))}
                onChange={handleNegeriSelect}
            />

            {(negeri !== null && negeri.value !== '') && (
                <>
                    <Select
                        className="location-select"
                        classNamePrefix="select"
                        defaultValue={location}
                        isSearchable={false}
                        name="location"
                        value={location}
                        options={LOCATION_LIST[negeri.value]}
                        onChange={handleLocationSelect}
                    />
                </>
            )}

            {((negeri !== null && negeri.value !== '') && (location !== null && location.value !== '')) && (
                <div className="btn-container">
                    <button onClick={saveData}>{showLanding ? 'Update' : 'Save'}</button>
                    <button onClick={resetData}>Reset</button>
                </div>
            )}
            {showLanding && <button className="btn-cancel" onClick={cancelReset}>Cancel</button>}
        </div>
    )
}

interface ConfigType {
    code: string;
    zone: string;
    state: string;
}

interface LandingProps {
    showLanding: boolean;
    setShowLanding: (show: boolean) => void;
    setConfig: (config: ConfigType) => void;
}
export default Landing