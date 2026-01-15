import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


    const OnlineRead = ({ onlinebook }) => {
    const { details, title, author, image, rating, bookContent } = onlinebook;

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    // idle | downloading | done
    const [status, setStatus] = useState("idle");
    const [progress, setProgress] = useState(0);

    // toast: {show, message, type}
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    const intervalRef = useRef(null);
    const toastTimeoutRef = useRef(null);

    useEffect(() => {
        return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        };
    }, []);

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        toastTimeoutRef.current = setTimeout(() => {
        setToast((p) => ({ ...p, show: false }));
        }, 2200);
    };

    const handleReadNow = () => {
        navigate("/read", { state: { title, author, image, bookContent } });
    };

    const startDownload = () => {
        // clear previous
        if (intervalRef.current) clearInterval(intervalRef.current);

        setStatus("downloading");
        setProgress(0);

        const totalTime = 2000; // 7s
        const tick = 100; // ms
        const step = 100 / (totalTime / tick);

        intervalRef.current = setInterval(() => {
        setProgress((prev) => {
            const next = prev + step;

            if (next >= 100) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;

            setStatus("done");
            setProgress(100);
            showToast("Downloaded", "success");
            return 100;
            }
            return next;
        });
        }, tick);
    };

    const cancelDownload = () => {
        if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        }
        setStatus("idle");
        setProgress(0);
        showToast("Cancelled", "error");
    };

    // ✅ Single icon click toggles: start vs cancel vs reset
    const handleDownloadIconClick = () => {
        if (status === "downloading") {
        cancelDownload();
        return;
        }
        if (status === "done") {
        // clicking after done resets to idle (optional)
        setStatus("idle");
        setProgress(0);
        return;
        }
        startDownload();
    };

    // circular progress config
    const size = 36;
    const stroke = 3;
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const offset = c - (progress / 100) * c;

    const ringColor =
        status === "done" ? "#16a34a" : status === "downloading" ? "#664932" : "rgba(0,0,0,0.15)";

    return (
        <>
        {/* ✅ TOP TOAST */}
        <div
            className={`fixed top-4 right-4 z-[9999] transition-all duration-300 ${
            toast.show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
            }`}
        >
            <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${
                toast.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
            >
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                toast.type === "success" ? "bg-green-600" : "bg-red-600"
                }`}
            >
                {toast.type === "success" ? "✓" : "✕"}
            </div>
            <span className="font-semibold text-sm">{toast.message}</span>
            </div>
        </div>

        <div className="w-64">
            <div className="card bg-base-100 h-[26rem] shadow-sm mx-auto">
            <figure className="px-6 pt-16 flex justify-center">
                <img src={image} alt={title} className="w-42 h-64 object-cover rounded-md" />
            </figure>

            <div className="card-body items-center text-center pt-6">
                <h2 className="card-title text-base">{title}</h2>

                {author && <p className="text-sm text-gray-600">Author : {author}</p>}

                <div className="flex items-center gap-4 mt-1 w-full px-4">
                {/* ✅ ICON BUTTON (NO LINK => no page open) */}
                <button
                    type="button"
                    onClick={handleDownloadIconClick}
                    className="relative w-9 h-9 flex items-center justify-center"
                    title={status === "downloading" ? "Cancel" : "Download"}
                >
                    {/* ring */}
                    <svg width={size} height={size} className="absolute">
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={r}
                        stroke="rgba(0,0,0,0.15)"
                        strokeWidth={stroke}
                        fill="none"
                    />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={r}
                        stroke={status === "idle" ? "rgba(0,0,0,0.0)" : ringColor}
                        strokeWidth={stroke}
                        fill="none"
                        strokeDasharray={c}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{
                        transform: "rotate(-90deg)",
                        transformOrigin: "50% 50%",
                        transition: "stroke-dashoffset 100ms linear",
                        }}
                    />
                    </svg>

                    {/* center */}
                    <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${
                        status === "done"
                        ? "bg-green-600"
                        : status === "downloading"
                        ? "bg-[#d2b48c]"
                        : "bg-[#d2b48c] hover:bg-[#c49f76]"
                    }`}
                    >
                    {status === "idle" && "↓"}
                    {status === "downloading" && `${Math.round(progress)}%`}
                    {status === "done" && "✓"}
                    </div>
                </button>

                <span className="font-semibold">Rating: ⭐ {rating}</span>
                </div>

                {/* ✅ Only show Downloaded text after complete */}
                <div className="mt-2 text-xs font-semibold">
                {status === "done" && <span className="text-green-600">Downloaded</span>}
                </div>

                <div className="card-actions w-full flex gap-3 justify-center mt-4">
                <button
                    onClick={handleReadNow}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#664932] text-white hover:opacity-90 transition"
                >
                    Read Now
                </button>

                <button
                    onClick={() => setOpen(true)}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#664932] text-white hover:opacity-90 transition"
                >
                    Details
                </button>
                </div>
            </div>
            </div>

            {open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)}></div>

                <div className="relative bg-white w-[600px] max-w-full p-6 rounded-lg shadow-lg z-10">
                <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>

                <p className="text-base text-justify leading-relaxed">{details}</p>

                <div className="flex justify-center mt-6">
                    <button
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 bg-[#664932] text-white rounded hover:bg-[#532b23]"
                    >
                    Close
                    </button>
                </div>
                </div>
            </div>
            )}
        </div>
        </>
    );
};

export default OnlineRead;
