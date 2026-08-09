import { useRegisterSW } from 'virtual:pwa-register/react';

import styles from './ReloadPrompt.module.scss';

export function ReloadPrompt() {
    const {
        needRefresh: [needRefresh],
        updateServiceWorker,
    } = useRegisterSW();

    if (!needRefresh) return null;

    return (
        <div className={styles.prompt}>
            <span>Доступна новая версия</span>
            <button
                className={styles.button}
                onClick={() => updateServiceWorker(true)}
            >
                Обновить
            </button>
        </div>
    );
}
