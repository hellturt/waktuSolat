import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { clearInterval, clearTimeout, setInterval, setTimeout } from 'worker-timers';
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
import { invoke } from '@tauri-apps/api/tauri'
import { getTiming, getHijriDate } from '../../api';
import { PRAYER_LABEL, HIJRI_MONTH, GREG_MONTH, DAY_LABEL } from '../../const';
import './style.scss';

interface TimingListProps {
    config: {
        code: string;
        zone: string;
        state: string;
    };
    setShowLanding: (show: boolean) => void;
}

const TimingList: React.FC<TimingListProps> = ({ config, setShowLanding }) => {
    const { state, zone, code } = config;
    const [timingList, setTimingList] = useState<any[]>([]);
    const [hjDate, setHjDate] = useState('');
    const [filter, setFilter] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const currentDate = moment().format('D MMM YYYY');

    useEffect(() => {
        getTimingData();
        convertHijriDate();
    }, []);

    useEffect(() => {
        getTimingData();
    }, [filter]);

    useEffect(() => {
        if(timingList.length === 0 || filter !== 1) return 
        
        const currentTimestamp = Math.floor(Date.now() / 1000)
        const startMoment = moment.unix(currentTimestamp)
        const tomorrow  = moment().add(1,'days').hour(0).minutes(0).seconds(1)
        const tmrwTimestamp = tomorrow.unix()
        const nextDayDuration = moment.duration(moment.unix(tmrwTimestamp).diff(startMoment)).asMilliseconds()

        let subuhTimeout: null | ReturnType<typeof setTimeout> = null
        let zohorTimeout: null | ReturnType<typeof setTimeout> = null
        let asarTimeout: null | ReturnType<typeof setTimeout> = null
        let maghribTimeout: null | ReturnType<typeof setTimeout> = null
        let isyakTimeout: null | ReturnType<typeof setTimeout> = null
        
        // Subuh
        if(timingList[0] > currentTimestamp) {
            const subuhDuration = moment.duration(moment.unix(timingList[0]).diff(startMoment)).asMilliseconds()
            subuhTimeout = setTimeout(() => {sendNotification({ title: 'Solat Notification', body: `Sekarang telah masuk waktu Subuh.` })}, subuhDuration)
        }

        // Zohor
        if(timingList[2] > currentTimestamp) {
            const zohorDuration = moment.duration(moment.unix(timingList[2]).diff(startMoment)).asMilliseconds()
            zohorTimeout = setTimeout(() => {sendNotification({ title: 'Solat Notification', body: `Sekarang telah masuk waktu Zohor.` })}, zohorDuration)
        }

        // Asar
        if(timingList[3] > currentTimestamp) {
            const asarDuration = moment.duration(moment.unix(timingList[3]).diff(startMoment)).asMilliseconds()
            asarTimeout = setTimeout(() => {sendNotification({ title: 'Solat Notification', body: `Sekarang telah masuk waktu Asar.` })}, asarDuration)
        }

        // Maghrib
        if(timingList[4] > currentTimestamp) {
            const maghribDuration = moment.duration(moment.unix(timingList[4]).diff(startMoment)).asMilliseconds()
            maghribTimeout = setTimeout(() => {sendNotification({ title: 'Solat Notification', body: `Sekarang telah masuk waktu Maghrib.` })}, maghribDuration)
        }

        // Isyak
        if(timingList[5] > currentTimestamp) {
            const isyakDuration = moment.duration(moment.unix(timingList[5]).diff(startMoment)).asMilliseconds()
            isyakTimeout = setTimeout(() => {sendNotification({ title: 'Solat Notification', body: `Sekarang telah masuk waktu Isyak.` })}, isyakDuration)
        }

        // Next Day
        let nextDayTimeout = setTimeout(() => {
            getTimingData()
            sendNotification({ title: 'Waktu Solat', body: `Waktu solat for ${DAY_LABEL[tomorrow.weekday()]}, ${tomorrow.date()}/${tomorrow.month() + 1}/${tomorrow.year()} updated.` })
        }, nextDayDuration)

        // Cleanup function to cancel the timeout when component unmounts or changes
        return () => {
            if (subuhTimeout) clearTimeout(subuhTimeout)
            if (zohorTimeout) clearTimeout(zohorTimeout)
            if (asarTimeout) clearTimeout(asarTimeout)
            if (maghribTimeout) clearTimeout(maghribTimeout)
            if (isyakTimeout) clearTimeout(isyakTimeout)
            clearTimeout(nextDayTimeout)
        };
      }, [timingList]);

    const getTimingData = async () => {
        try {
            const res = await getTiming(code, filter);
            const { response, meta } = res.data;
            const { times } = response;
            setTimingList(times);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
            invoke('close_splashscreen')
            
        }
    }

    const displayTiming = () => {
        if (timingList.length === 0) return null;

        if (filter === 1) {
            return (
                <div className='timing-box day'>
                    {timingList.map((time: number, index: number) => (
                        <div key={index} className='single-timing'>
                            <span key='label'>{PRAYER_LABEL[index]}</span>
                            <span key='time'>{moment.unix(time).format('h:mm a')}</span>
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div className='timing-box week'>
                    <div className='label-container'>
                        <span></span>
                        {PRAYER_LABEL.map((label: string, index: number) => (
                            <span key={index}>{label}</span>
                        ))}
                    </div>

                    <div className='scroll-container'>
                        {timingList.map((innerArray: number[], index: number) => {
                            return (
                                <div className='single-day' key={index}>
                                    <span
                                        className={`day-label ${currentDate ===
                                            moment.unix(innerArray[0]).format('D MMM YYYY')
                                            ? 'highlight'
                                            : ''
                                            } `}
                                    >
                                        {moment.unix(innerArray[0]).format('D/M/YYYY')}
                                    </span>
                                    {innerArray.map((item: number, innerIndex: number) => {
                                        return (
                                            <div key={innerIndex} className='single-timing'>
                                                <span
                                                    className={`${currentDate ===
                                                        moment.unix(item).format('D MMM YYYY')
                                                        ? 'highlight'
                                                        : ''
                                                        }`}
                                                >
                                                    {moment.unix(item).format('h:mm a')}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
    };

    const changeFilter = (index: number) => {
        setIsLoading(true);
        setFilter(index);
    };

    const convertHijriDate = async () => {
        const gDate = moment().format('D-M-YYYY');

        try {
            const res = await getHijriDate(gDate);
            const { status, data } = res;
            if (status !== 200) throw new Error('Error fetching hijri date.');

            const hijriObj = data.data.hijri;
            const hijriDateArr = hijriObj.date.split('-');
            const hijriMonth = HIJRI_MONTH[hijriDateArr[1] - 1];
            const hijriDateString = `${parseInt(hijriDateArr[0], 10).toString()} ${hijriMonth} ${hijriDateArr[2]}`;
            setHjDate(hijriDateString);
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <div className='container timing-container'>
            {state === 'Wilayah Persekutuan' ? (
                <p>Waktu solat bagi kawasan {state} {zone}</p>
            ) : (
                <p>Waktu solat bagi kawasan {zone}, {state}</p>
            )}

            <p>
                {currentDate} {hjDate !== '' && '/'} {hjDate !== '' && hjDate}
            </p>

            <div className='filter-box'>
                <button disabled={filter === 1} onClick={() => changeFilter(1)}>
                    Today
                </button>
                <button disabled={filter === 2} onClick={() => changeFilter(2)}>
                    Week
                </button>
                <button disabled={filter === 3} onClick={() => changeFilter(3)}>
                    Month
                </button>
            </div>

            {!isLoading && displayTiming()}
        </div>
    );
};

export default TimingList;