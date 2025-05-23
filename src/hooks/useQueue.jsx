import {useRecoilState, useRecoilValue} from "recoil";
import {currentTrackAtom, queueAtom} from "@/atoms.js";
import {useRefreshData} from "@/hooks/useRefreshData.jsx";
import useLoading from "@/hooks/useLoading.jsx";
import {confirmModal} from "@/components/ui/confirm-modal/ConfirmModal.jsx";
import {updateQueue} from "@/api/queue.js";
import {emitter} from "@/emitter.js";

const useQueue = () => {

    const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackAtom);
    const queue = useRecoilValue(queueAtom);
    const { refreshQueue } = useRefreshData();
    const { setIsLoading } = useLoading(70);

    const clearQueue = async () => {
        let confirm = await confirmModal('Очистить очередь?');

        if (confirm) {
            setIsLoading(true);
            await updateQueue([]);
            await refreshQueue();

            if (currentTrack?.type === 'queue') {
                emitter.emit('clearPlayer');
            }

            setIsLoading(false);
        }
    }

    return {
        clearQueue
    };
};

export default useQueue;