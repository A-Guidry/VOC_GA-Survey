import React, { useState, useRef, useEffect } from 'react';
import {
    Play,
    ArrowRight,
    Check,
    Plus,
    Trash2,
    Download,
    Settings,
    Users,
    Video,
    MonitorPlay,
    ChevronRight,
    Lock,
    Info
} from 'lucide-react';

// --- Stylesheet ---
const STYLESHEET = `
/* Base & Layout */
.app-wrapper { min-height: 100vh; background-color: #09090b; color: #fafafa; font-family: system-ui, -apple-system, sans-serif; display: flex; flex-direction: column; }
.main-content { padding-top: 5rem; padding-bottom: 3rem; min-height: 100vh; display: flex; flex-direction: column; flex: 1; box-sizing: border-box; }
.hidden { display: none; }
.sm-inline { display: none; }
@media (min-width: 640px) {
  .sm-inline { display: inline; }
  .sm-hidden { display: none; }
}

/* Header */
.header-container { position: fixed; top: 0; left: 0; right: 0; padding: 1rem; display: flex; justify-content: space-between; align-items: center; z-index: 50; background: linear-gradient(to bottom, rgba(9,9,11,0.9), transparent); pointer-events: none; }
.header-brand { font-weight: bold; letter-spacing: 0.1em; color: #a1a1aa; font-size: 0.875rem; display: flex; align-items: center; gap: 0.5rem; pointer-events: auto; }
.header-controls { display: flex; background-color: #18181b; border-radius: 9999px; padding: 0.25rem; border: 1px solid #27272a; pointer-events: auto; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
.mode-btn { padding: 0.375rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500; transition: all 0.2s; background: transparent; border: none; color: #a1a1aa; cursor: pointer; }
.mode-btn:hover { color: #ffffff; }
.mode-btn-active { background-color: #3f3f46; color: #ffffff; }
.mode-btn-admin-active { background-color: #2563eb; color: #ffffff; }

/* Buttons */
.btn-primary { background-color: #ffffff; color: #09090b; padding: 0.75rem 2rem; border-radius: 0.375rem; font-size: 1.125rem; font-weight: 500; display: inline-flex; align-items: center; gap: 0.5rem; border: none; cursor: pointer; transition: background-color 0.2s; }
.btn-primary:hover:not(:disabled) { background-color: #e4e4e7; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-secondary { background-color: #27272a; color: #ffffff; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 500; display: inline-flex; align-items: center; gap: 0.5rem; border: none; cursor: pointer; transition: background-color 0.2s; }
.btn-secondary:hover { background-color: #3f3f46; }

/* Admin Auth Screen */
.auth-screen { flex: 1; display: flex; align-items: center; justify-content: center; padding: 1.5rem; animation: fadeIn 0.5s; }
.auth-card { width: 100%; max-width: 24rem; background-color: #18181b; border: 1px solid #27272a; border-radius: 1rem; padding: 2rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
.auth-icon-wrap { width: 3.5rem; height: 3.5rem; background-color: #27272a; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; color: #a1a1aa; }
.auth-title { font-size: 1.5rem; font-weight: 300; text-align: center; margin-bottom: 0.5rem; color: #ffffff; }
.auth-subtitle { color: #71717a; text-align: center; font-size: 0.875rem; margin-bottom: 2rem; }
.auth-input-group { margin-bottom: 1rem; }
.auth-input { width: 100%; background-color: #09090b; border: 1px solid #3f3f46; border-radius: 0.5rem; padding: 0.75rem 1rem; color: #ffffff; outline: none; text-align: center; letter-spacing: 0.1em; transition: border-color 0.2s; box-sizing: border-box; }
.auth-input:focus { border-color: #3b82f6; }
.auth-input-error { border-color: #ef4444; }
.auth-error-text { color: #f87171; font-size: 0.75rem; text-align: center; margin-top: 0.5rem; }
.auth-submit-btn { width: 100%; background-color: #2563eb; color: #ffffff; padding: 0.75rem; border-radius: 0.5rem; font-weight: 500; border: none; cursor: pointer; transition: background-color 0.2s; }
.auth-submit-btn:hover { background-color: #3b82f6; }

/* User Intro Screen */
.intro-screen { flex: 1; display: flex; align-items: center; justify-content: center; padding: 1.5rem; animation: slideUpFadeIn 0.7s; }
.intro-content { max-width: 36rem; width: 100%; }
.intro-title { font-size: 2.25rem; font-weight: 300; margin-bottom: 2rem; color: #ffffff; line-height: 1.25; }
@media (min-width: 768px) { .intro-title { font-size: 3rem; } }
.intro-title span { color: #71717a; }
.intro-subtitle { color: #a1a1aa; margin-bottom: 2rem; }
.intro-fields { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 3rem; }
.intro-input { width: 100%; background: transparent; border: none; border-bottom: 2px solid #27272a; font-size: 1.5rem; padding: 0.75rem 0; color: #ffffff; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
.intro-input:focus { border-color: #3b82f6; }
.intro-input::placeholder { color: #3f3f46; }

/* User Outro Screen */
.outro-screen { flex: 1; display: flex; align-items: center; justify-content: center; padding: 1.5rem; animation: slideUpFadeIn 1s; }
.outro-content { text-align: center; max-width: 32rem; }
.outro-icon-wrap { width: 5rem; height: 5rem; background-color: rgba(34, 197, 94, 0.2); color: #4ade80; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem auto; }
.outro-title { font-size: 2.25rem; font-weight: 300; margin-bottom: 1rem; color: #ffffff; }
.outro-subtitle { font-size: 1.25rem; color: #a1a1aa; margin-bottom: 2rem; }

/* Evaluation Flow Elements */
.eval-screen { flex: 1; display: flex; flex-direction: column; padding: 1rem; margin: 0 auto; width: 100%; position: relative; animation: fadeIn 0.5s; box-sizing: border-box; }
@media (min-width: 768px) { .eval-screen { padding: 1.5rem; } }
.progress-bar-wrap { position: fixed; top: 72px; left: 0; right: 0; height: 4px; background-color: #18181b; z-index: 40; }
.progress-bar-fill { height: 100%; background-color: #3b82f6; transition: width 0.5s ease-out; }
.clip-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; margin-top: 1rem; }
.clip-counter { color: #3b82f6; font-weight: 500; letter-spacing: 0.05em; font-size: 0.875rem; text-transform: uppercase; }
.clip-title { color: #a1a1aa; font-weight: 500; }

.video-wrap { width: 100%; aspect-ratio: 16 / 9; background-color: #000000; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 1px solid #27272a; margin-bottom: 2.5rem; }
.video-element { width: 100%; height: 100%; border: none; object-fit: contain; }

.questions-wrap { display: flex; flex-direction: column; gap: 2.5rem; }
.question-card { background-color: rgba(24, 24, 27, 0.4); padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(39, 39, 42, 0.8); }
@media (min-width: 768px) { .question-card { padding: 2rem; } }
.question-title { font-size: 1.5rem; font-weight: 300; color: #ffffff; margin-bottom: 1.5rem; margin-top: 0; }
.asterisk { color: #ef4444; margin-left: 0.25rem; }

.rating-list { display: flex; flex-direction: column; gap: 0.75rem; }
.rating-btn { width: 100%; text-align: left; padding: 1rem; border-radius: 0.75rem; border: 2px solid #27272a; background-color: rgba(24, 24, 27, 0.5); color: #a1a1aa; display: flex; align-items: center; gap: 1rem; transition: all 0.2s; cursor: pointer; }
@media (min-width: 768px) { .rating-btn { padding: 1.25rem; } }
.rating-btn:hover { border-color: #52525b; color: #e4e4e7; }
.rating-btn-active { border-color: #3b82f6; background-color: rgba(59, 130, 246, 0.1); color: #ffffff; }
.radio-circle { width: 1.25rem; height: 1.25rem; border-radius: 50%; border: 2px solid #52525b; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.rating-btn-active .radio-circle { border-color: #3b82f6; }
.radio-circle-fill { width: 0.625rem; height: 0.625rem; background-color: #3b82f6; border-radius: 50%; }
.rating-text { font-size: 1.125rem; }

.question-desc { color: #71717a; margin-bottom: 1.5rem; font-size: 0.875rem; margin-top: -1rem; }
.issues-grid { display: grid; grid-template-columns: 1fr; gap: 0.75rem; margin-bottom: 1rem; }
@media (min-width: 768px) { .issues-grid { grid-template-columns: 1fr 1fr; } }
.issue-label { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border: 1px solid #27272a; border-radius: 0.75rem; background-color: rgba(24, 24, 27, 0.5); cursor: pointer; transition: all 0.2s; margin: 0; }
.issue-label:hover { background-color: rgba(39, 39, 42, 0.5); }
.issue-label-active { border-color: #3b82f6; background-color: rgba(59, 130, 246, 0.05); }
.checkbox-box { width: 1.25rem; height: 1.25rem; border-radius: 0.25rem; border: 1px solid #52525b; background-color: #09090b; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s; }
.issue-label-active .checkbox-box { background-color: #3b82f6; border-color: #3b82f6; }
.issue-text { color: #d4d4d8; }
.issue-label-active .issue-text { color: #ffffff; }

.other-input-wrap { display: flex; flex-direction: column; gap: 0.75rem; padding: 1rem; border: 1px solid #27272a; background-color: rgba(24, 24, 27, 0.5); border-radius: 0.75rem; transition: all 0.2s; }
@media (min-width: 640px) { .other-input-wrap { flex-direction: row; align-items: center; } }
.other-input-wrap:focus-within { border-color: #3b82f6; background-color: #18181b; }
.other-label { color: #a1a1aa; white-space: nowrap; font-weight: 500; }
.other-input { width: 100%; background: transparent; border: none; color: #ffffff; outline: none; }
.other-input::placeholder { color: #52525b; }

.action-bar { display: flex; justify-content: flex-end; padding-top: 1rem; padding-bottom: 2.5rem; }

/* Admin Dashboard */
.admin-screen { flex: 1; display: flex; flex-direction: column; padding: 1.5rem; margin: 0 auto; width: 100%; box-sizing: border-box; }
.admin-header { margin-bottom: 2rem; }
.admin-title { font-size: 1.875rem; font-weight: 300; color: #ffffff; margin-bottom: 0.5rem; margin-top: 0; }
.admin-desc { color: #a1a1aa; margin: 0; }
.admin-tabs { display: flex; border-bottom: 1px solid #27272a; margin-bottom: 2rem; }
.admin-tab { padding: 1rem 1.5rem; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; border-bottom: 2px solid transparent; transition: all 0.2s; background: transparent; border-top: none; border-left: none; border-right: none; cursor: pointer; color: #71717a; font-size: 1rem; }
.admin-tab:hover { color: #d4d4d8; }
.admin-tab-active { border-bottom-color: #3b82f6; color: #60a5fa; }

.admin-note { display: flex; justify-content: space-between; align-items: center; background-color: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); padding: 1rem; border-radius: 0.75rem; margin-bottom: 1.5rem; }
.admin-note-text { color: #60a5fa; font-size: 0.875rem; margin: 0; }

.section-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.section-title { font-size: 1.25rem; font-weight: 500; color: #ffffff; margin: 0; }

.survey-list { display: flex; flex-direction: column; gap: 1rem; }
.survey-item { background-color: rgba(24, 24, 27, 0.5); border: 1px solid #27272a; padding: 1.25rem; border-radius: 0.75rem; display: flex; justify-content: space-between; align-items: center; transition: border-color 0.2s; }
.survey-item:hover { border-color: #3f3f46; }
.survey-item-active { border-color: #3b82f6; background-color: rgba(59, 130, 246, 0.05); }
.survey-info { display: flex; flex-direction: column; gap: 0.25rem; }
.survey-name { font-weight: 500; color: #ffffff; font-size: 1.125rem; }
.survey-meta { color: #71717a; font-size: 0.875rem; display: flex; gap: 1rem; }
.survey-status { padding: 0.125rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
.status-published { background-color: rgba(34, 197, 94, 0.2); color: #4ade80; }
.status-draft { background-color: rgba(161, 161, 170, 0.2); color: #a1a1aa; }
.survey-actions { display: flex; gap: 0.75rem; }
.publish-toggle-bar { display: flex; align-items: center; gap: 1rem; padding: 0.875rem 1.25rem; background: rgba(24,24,27,0.5); border: 1px solid #27272a; border-radius: 0.75rem; margin-bottom: 1.25rem; }
.publish-toggle-label { font-size: 0.875rem; color: #a1a1aa; }
.toggle-switch { position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer; }
.toggle-switch input { opacity: 0; width: 0; height: 0; }
.toggle-slider { position: absolute; inset: 0; background-color: #3f3f46; border-radius: 24px; transition: 0.3s; }
.toggle-slider:before { position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; border-radius: 50%; transition: 0.3s; }
.toggle-switch input:checked + .toggle-slider { background-color: #22c55e; }
.toggle-switch input:checked + .toggle-slider:before { transform: translateX(20px); }
.rotation-info { background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 0.5rem; padding: 0.625rem 1rem; font-size: 0.8rem; color: #93c5fd; display: flex; align-items: center; gap: 0.5rem; }

.clip-list { display: flex; flex-direction: column; gap: 1rem; }
.clip-item { background-color: rgba(24, 24, 27, 0.5); border: 1px solid #27272a; padding: 1.25rem; border-radius: 0.75rem; display: flex; gap: 1rem; transition: border-color 0.2s; }
.clip-item:hover { border-color: #3f3f46; }
.clip-num { color: #52525b; font-weight: 500; padding-top: 0.75rem; }
.clip-fields { flex: 1; display: flex; flex-direction: column; gap: 1rem; }
.clip-field { display: flex; flex-direction: column; gap: 0.25rem; }
.clip-label { font-size: 0.75rem; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; font-weight: bold; }
.clip-input { width: 100%; background-color: #09090b; border: 1px solid #27272a; border-radius: 0.25rem; color: #ffffff; padding: 0.5rem 0.75rem; outline: none; box-sizing: border-box; }
.clip-input:focus { border-color: #3b82f6; }
.clip-url-wrap { display: flex; align-items: center; gap: 0.75rem; }
.clip-url-icon { color: #71717a; }
.clip-url-input { width: 100%; background: transparent; border: none; border-bottom: 1px solid #27272a; color: #ffffff; padding: 0.5rem 0; outline: none; }
.clip-url-input:focus { border-color: #3b82f6; }
.btn-remove { color: #52525b; background: transparent; border: none; cursor: pointer; padding: 0.5rem; border-radius: 0.25rem; transition: color 0.2s; display: flex; align-self: flex-start; }
.btn-remove:hover { color: #f87171; }

.empty-state { text-align: center; padding: 2.5rem 0; border: 1px dashed #27272a; border-radius: 0.75rem; color: #71717a; }
.empty-state-icon { margin: 0 auto 1rem auto; opacity: 0.2; display: block; }

.btn-export { background-color: #2563eb; color: #ffffff; padding: 0.625rem 1.25rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 500; display: inline-flex; align-items: center; gap: 0.5rem; border: none; cursor: pointer; transition: background-color 0.2s; }
.btn-export:hover:not(:disabled) { background-color: #3b82f6; }
.btn-export:disabled { opacity: 0.5; cursor: not-allowed; }

.table-container { background-color: #18181b; border: 1px solid #27272a; border-radius: 0.75rem; overflow-x: auto; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
.data-table { width: 100%; text-align: left; font-size: 0.875rem; color: #a1a1aa; white-space: nowrap; border-collapse: collapse; }
.table-thead { background-color: #09090b; color: #d4d4d8; font-size: 0.75rem; text-transform: uppercase; font-weight: 500; }
.table-th { padding: 1rem 1.5rem; border-right: 1px solid rgba(39, 39, 42, 0.5); }
.table-th-center { text-align: center; }
.table-th-sub { padding: 0.5rem 1rem; color: #71717a; border-right: 1px solid rgba(39, 39, 42, 0.5); border-top: 1px solid rgba(39, 39, 42, 0.5); background-color: rgba(9, 9, 11, 0.5); }
.table-tbody { display: table-row-group; }
.table-tr { border-top: 1px solid rgba(39, 39, 42, 0.5); transition: background-color 0.2s; }
.table-tr:hover { background-color: rgba(39, 39, 42, 0.3); }
.table-td { padding: 1rem 1.5rem; border-right: 1px solid rgba(39, 39, 42, 0.5); }
.td-date { font-size: 0.75rem; color: #71717a; margin-bottom: 0.25rem; }
.td-name { font-weight: 500; color: #e4e4e7; }
.td-email { font-size: 0.75rem; }
.td-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.w-40 { width: 10rem; max-width: 10rem; }
.w-48 { width: 12rem; max-width: 12rem; }
.issues-pill { background-color: rgba(39, 39, 42, 0.5); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; }

.external-survey-badge { background-color: rgba(168, 85, 247, 0.2); color: #c084fc; font-size: 0.65rem; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-weight: 600; text-transform: uppercase; margin-left: 0.5rem; }

/* Animations */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUpFadeIn { from { opacity: 0; transform: translateY(1rem); } to { opacity: 1; transform: translateY(0); } }
`;

// --- Utility Functions ---

const getEmbedUrl = (url) => {
    if (!url) return '';
    try {
        let videoId = null;

        // Handle different YouTube URL formats
        if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1]?.split('?')[0];
        } else if (url.includes('youtube.com/watch')) {
            const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
            videoId = urlObj.searchParams.get('v');
        } else if (url.includes('youtube.com/shorts/')) {
            videoId = url.split('youtube.com/shorts/')[1]?.split('?')[0];
        } else if (url.includes('youtube.com/embed/') || url.includes('youtube-nocookie.com/embed/')) {
            videoId = url.split('/embed/')[1]?.split('?')[0];
        }

        if (videoId) {
            videoId = videoId.replace(/[&#].*/, '');
            return `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&mute=1&loop=1&playlist=${videoId}`;
        }

        // Handle Google Drive URL formats
        if (url.includes('drive.google.com')) {
            let driveId = null;
            if (url.includes('/file/d/')) {
                driveId = url.split('/file/d/')[1]?.split('/')[0];
            } else if (url.includes('id=')) {
                const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
                driveId = urlObj.searchParams.get('id');
            }

            if (driveId) {
                return `https://drive.google.com/file/d/${driveId}/preview`;
            }
        }

    } catch (e) {
        console.warn("Failed to parse video URL:", e);
    }

    return url;
};

const escapeCSV = (str) => {
    if (str === null || str === undefined) return '""';
    return `"${String(str).replace(/"/g, '""')}"`;
};

// --- Constants ---

const RATING_OPTIONS = [
    "1. I would rather create it by hand",
    "2. I can use it with making minor/acceptable edits",
    "3. I can use it as is/very few edits"
];

const ISSUE_OPTIONS = [
    "Finger Issues",
    "Foot Skating",
    "Ground Penetration",
    "Missing Armature/Appendature",
    "Unnatural Movement",
    "Joint Popping",
    "Jitter"
];

const ADMIN_PASSCODE = "bxd2026"; // Hardcoded for MVP

// --- Main Application Component ---

export default function App() {
    const [appMode, setAppMode] = useState('user');
    const [isLoaded, setIsLoaded] = useState(false);
    const [externalSurvey, setExternalSurvey] = useState(null);
    const [externalError, setExternalError] = useState(null);
    const [isExternalLoading, setIsExternalLoading] = useState(false);

    // Inject CSS dynamically into the <head> to ensure it loads in sandbox environments
    useEffect(() => {
        const styleId = 'bxd-eval-stylesheet';
        if (!document.getElementById(styleId)) {
            const styleElement = document.createElement('style');
            styleElement.id = styleId;
            styleElement.innerHTML = STYLESHEET;
            document.head.appendChild(styleElement);
        }

        // Cleanup function
        return () => {
            const existingStyle = document.getElementById(styleId);
            if (existingStyle) {
                document.head.removeChild(existingStyle);
            }
        };
    }, []);

    const [surveys, setSurveys] = useState([]);
    const [activeAdminSurveyId, setActiveAdminSurveyId] = useState(null);

    // 0. Load survey from URL ?id= param, or fall back to public/surveys/default.json
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const surveyId = urlParams.get('id') || 'default'; // Always try a file; default when no ?id=

        setIsExternalLoading(true);
        const basePath = import.meta.env.BASE_URL || '/';
        const fetchUrl = `${basePath.replace(/\/$/, '')}/surveys/${surveyId}.json`;

        fetch(fetchUrl)
            .then(res => {
                if (!res.ok) {
                    // If no explicit ?id= and default.json not found, silently fall back to localStorage
                    if (surveyId === 'default') return null;
                    throw new Error(`Could not locate survey configuration for "${surveyId}". HTTP ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (!data) return; // silent fallback
                if (!data.id || !data.clips) {
                    if (surveyId === 'default') return; // silent fallback
                    throw new Error(`Survey file "${surveyId}.json" is missing required configuration data.`);
                }
                setExternalSurvey(data);
            })
            .catch(err => {
                console.error("External Survey Load Error:", err);
                // Only show error to user when an explicit ?id= was provided
                if (urlParams.get('id')) setExternalError(err.message);
            })
            .finally(() => {
                setIsExternalLoading(false);
            });
    }, []);

    // 1. Load surveys from committed JSON files in public/surveys/
    useEffect(() => {
        const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
        fetch(`${base}/surveys/index.json`)
            .then(r => r.json())
            .then(index => {
                const ids = Array.isArray(index.surveys) ? index.surveys : [];
                return Promise.all(
                    ids.map(id =>
                        fetch(`${base}/surveys/${id}.json`)
                            .then(r => r.ok ? r.json() : null)
                            .catch(() => null)
                    )
                );
            })
            .then(loaded => {
                const valid = loaded.filter(Boolean);
                setSurveys(valid);
                if (valid.length > 0) setActiveAdminSurveyId(valid[0].id);
            })
            .catch(err => console.error('Failed to load surveys from index.json:', err))
            .finally(() => setIsLoaded(true));
    }, []);

    // Random distribution: each new browser session gets a randomly assigned published survey.
    // sessionStorage keeps the assignment stable if the page is refreshed mid-evaluation.
    const publishedSurveys = surveys.filter(s => s.status === 'published');
    const getSessionSurveyIndex = (count) => {
        const stored = sessionStorage.getItem('bxd_survey_index');
        if (stored !== null) return parseInt(stored, 10);
        const newIndex = Math.floor(Math.random() * count);
        sessionStorage.setItem('bxd_survey_index', String(newIndex));
        return newIndex;
    };
    const randomIndex = publishedSurveys.length > 0 ? getSessionSurveyIndex(publishedSurveys.length) : 0;
    const activePublicSurvey = externalSurvey || publishedSurveys[randomIndex] || surveys[0];

    // ⚙️  Replace this with your Formspree form ID from formspree.io/forms
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykdrqln';

    const handleUserSubmit = async (newResponse) => {
        if (!activePublicSurvey) return;
        const surveyId = activePublicSurvey.id;

        // Send to Formspree
        if (!FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
            try {
                // Build a flat, ordered, human-readable payload for Formspree
                const payload = {
                    _subject: `New Survey Response: ${activePublicSurvey.name}`,
                    '01 - Survey': activePublicSurvey.name,
                    '02 - Date': newResponse.date,
                    '03 - Name': newResponse.artist.name,
                    '04 - Email': newResponse.artist.email,
                    '05 - Company': newResponse.artist.company,
                    '06 - Role': newResponse.artist.role,
                };

                // Add each clip's metadata + answers in order
                activePublicSurvey.clips.forEach((clip, i) => {
                    const ans = newResponse.answers[clip.id] || {};
                    const n = String(i + 1).padStart(2, '0');
                    const prefix = `Clip ${n}`;
                    payload[`${prefix} - Admin Title`] = clip.adminTitle || '';
                    payload[`${prefix} - Clip Title`] = clip.title || '';
                    payload[`${prefix} - YouTube URL`] = clip.url || '';
                    payload[`${prefix} - Rating`] = ans.rating || '';
                    payload[`${prefix} - Issues`] = (ans.issues || []).join(', ');
                    payload[`${prefix} - Other Issues`] = ans.other || '';
                });

                const res = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (res.ok) {
                    fetch(`https://api.countapi.xyz/hit/bxd-voc-survey/${surveyId}`).catch(() => { });
                    console.log('Response sent to Formspree successfully.');
                } else {
                    console.error(`Formspree submission failed: ${res.statusText}`);
                }
            } catch (error) {
                console.error('Formspree network error:', error);
            }
        } else {
            console.warn('Formspree not configured.');
        }
    };


    return (
        <div className="app-wrapper">
            {!isLoaded ? null : (
                <>
                    <div className="header-container">
                        <div className="header-brand">
                            <MonitorPlay size={16} />
                            <span className="sm-inline">BXD Motion Capture Quality Evaluation</span>
                            <span className="sm-hidden">BXD EVAL</span>
                            {externalSurvey && <span className="external-survey-badge">URL OVERRIDE</span>}
                        </div>
                        <div className="header-controls">
                            <button
                                onClick={() => setAppMode('user')}
                                className={`mode-btn ${appMode === 'user' ? 'mode-btn-active' : ''}`}
                            >
                                Preview Test
                            </button>
                            <button
                                onClick={() => setAppMode(appMode === 'admin' ? 'admin' : 'admin_auth')}
                                className={`mode-btn ${appMode === 'admin' || appMode === 'admin_auth' ? 'mode-btn-admin-active' : ''}`}
                            >
                                Admin Dashboard
                            </button>
                        </div>
                    </div>

                    <div className="main-content">
                        {isExternalLoading ? (
                            <div className="intro-screen">
                                <div className="intro-content" style={{ textAlign: 'center' }}>
                                    <h1 className="intro-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Loading Survey Configuration...</h1>
                                    <p className="intro-subtitle">Fetching data from GitHub repository.</p>
                                </div>
                            </div>
                        ) : externalError && appMode === 'user' ? (
                            <div className="intro-screen">
                                <div className="intro-content" style={{ textAlign: 'center' }}>
                                    <h1 className="intro-title" style={{ fontSize: '2rem', color: '#f87171' }}>Survey Not Found</h1>
                                    <p className="intro-subtitle" style={{ color: '#ef4444' }}>{externalError}</p>
                                    <p style={{ color: '#a1a1aa', fontSize: '0.875rem', marginTop: '2rem' }}>Check the ?id= parameter in your URL and ensure the .json file exists in the repository's public/surveys/ directory.</p>
                                </div>
                            </div>
                        ) : appMode === 'user' ? (
                            <UserEvaluationFlow
                                survey={activePublicSurvey}
                                onSubmit={handleUserSubmit}
                            />
                        ) : appMode === 'admin_auth' ? (
                            <AdminAuthScreen onSuccess={() => setAppMode('admin')} />
                        ) : appMode === 'admin' ? (
                            <AdminDashboard
                                surveys={surveys}
                                setSurveys={setSurveys}
                                activeAdminSurveyId={activeAdminSurveyId}
                                setActiveAdminSurveyId={setActiveAdminSurveyId}
                            />
                        ) : null}
                    </div>
                </>
            )}
        </div>
    );
}

// ==========================================
// ADMIN AUTH SCREEN
// ==========================================
function AdminAuthScreen({ onSuccess }) {
    const [passcode, setPasscode] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passcode === ADMIN_PASSCODE) {
            setError(false);
            onSuccess();
        } else {
            setError(true);
            setPasscode('');
        }
    };

    return (
        <div className="auth-screen">
            <div className="auth-card">
                <div className="auth-icon-wrap">
                    <Lock size={24} />
                </div>
                <h2 className="auth-title">Admin Access</h2>
                <p className="auth-subtitle">Enter passcode to view responses and configure the evaluation.</p>

                <form onSubmit={handleSubmit}>
                    <div className="auth-input-group">
                        <input
                            type="password"
                            autoFocus
                            placeholder="Enter passcode..."
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                            className={`auth-input ${error ? 'auth-input-error' : ''}`}
                        />
                        {error && <p className="auth-error-text">Incorrect passcode. Try again.</p>}
                    </div>
                    <button type="submit" className="auth-submit-btn">
                        Unlock Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}

// ==========================================
// USER EVALUATION FLOW
// ==========================================
function UserEvaluationFlow({ survey, onSubmit }) {
    if (!survey || !survey.clips || survey.clips.length === 0) {
        return (
            <div className="intro-screen">
                <div className="intro-content">
                    <h1 className="intro-title">No Active Survey</h1>
                    <p className="intro-subtitle">There is currently no animation survey configured. Please visit the admin dashboard.</p>
                </div>
            </div>
        );
    }
    const [step, setStep] = useState(-1);
    const [artistData, setArtistData] = useState({ name: '', email: '', company: '', role: '' });
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = () => {
        if (step === -1 && (!artistData.name || !artistData.email || !artistData.company || !artistData.role)) {
            alert("Please provide all personal details (Name, Email, Company, and Role).");
            return;
        }

        if (step >= 0 && step < survey.clips.length) {
            const currentClip = survey.clips[step];
            const currentAnswer = answers[currentClip.id];
            if (!currentAnswer || !currentAnswer.rating) {
                alert("Please rate the animation before proceeding.");
                return;
            }

            const needsIssues = currentAnswer.rating.startsWith('1') || currentAnswer.rating.startsWith('2');
            const hasIssues = (currentAnswer.issues && currentAnswer.issues.length > 0) || (currentAnswer.other && currentAnswer.other.trim() !== '');

            if (needsIssues && !hasIssues) {
                alert("Because you selected a rating of 1 or 2, please select at least one issue or describe it in the 'Other' field.");
                return;
            }
        }

        if (step === survey.clips.length - 1) {
            setIsSubmitting(true);
            const finalPayload = {
                id: `resp-${Date.now()}`,
                date: new Date().toISOString().split('T')[0],
                artist: artistData,
                answers: answers
            };

            Promise.resolve(onSubmit(finalPayload))
                .then(() => {
                    setStep(step + 1);
                })
                .catch(err => {
                    console.error("Submission failed:", err);
                })
                .finally(() => {
                    setIsSubmitting(false);
                });
        } else {
            setStep(step + 1);
            window.scrollTo(0, 0);
        }
    };

    const updateClipAnswer = (clipId, field, value) => {
        setAnswers(prev => ({
            ...prev,
            [clipId]: {
                ...(prev[clipId] || { rating: '', issues: [], other: '' }),
                [field]: value
            }
        }));
    };

    const toggleIssue = (clipId, issue) => {
        const currentIssues = answers[clipId]?.issues || [];
        if (currentIssues.includes(issue)) {
            updateClipAnswer(clipId, 'issues', currentIssues.filter(i => i !== issue));
        } else {
            updateClipAnswer(clipId, 'issues', [...currentIssues, issue]);
        }
    };

    if (step === -1) {
        return (
            <div className="intro-screen">
                <div className="intro-content">
                    <h1 className="intro-title">
                        BXD Motion Capture <br /><span>Quality Evaluation</span>
                    </h1>
                    <p className="intro-subtitle">Please enter your details to begin the review session.</p>

                    <div className="intro-fields">
                        {['name', 'email', 'company', 'role'].map((field) => (
                            <div key={field}>
                                <input
                                    type={field === 'email' ? 'email' : 'text'}
                                    placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)} *`}
                                    value={artistData[field]}
                                    onChange={(e) => setArtistData({ ...artistData, [field]: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                    className="intro-input"
                                />
                            </div>
                        ))}
                    </div>

                    <div>
                        <button onClick={handleNext} className="btn-primary">
                            Begin Evaluation <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (step === survey.clips.length) {
        return (
            <div className="outro-screen">
                <div className="outro-content">
                    <div className="outro-icon-wrap">
                        <Check size={40} />
                    </div>
                    <h1 className="outro-title">Evaluation Complete</h1>
                    <p className="outro-subtitle">Thank you, {artistData.name}. Your BXD quality feedback has been recorded.</p>
                </div>
            </div>
        );
    }

    const currentClip = survey.clips[step];
    const clipAnswer = answers[currentClip.id] || { rating: '', issues: [], other: '' };
    const embedUrl = getEmbedUrl(currentClip.url);
    const useIframe = embedUrl.includes('/embed/') || embedUrl.includes('/preview');
    const progressPercent = ((step) / survey.clips.length) * 100;

    return (
        <div className="eval-screen">

            <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
            </div>

            <div className="clip-header">
                <div className="clip-counter">
                    CLIP {step + 1} OF {survey.clips.length}
                </div>
                <div className="clip-title">
                    {currentClip.title}
                </div>
            </div>

            <div className="video-wrap">
                {useIframe ? (
                    <iframe
                        src={embedUrl}
                        title={currentClip.title || "Evaluation Video"}
                        className="video-element"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <video
                        src={embedUrl}
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="video-element"
                        title={currentClip.title || "Evaluation Video"}
                    />
                )}
            </div>

            <div className="questions-wrap">
                <div className="question-card">
                    <h2 className="question-title">1. How would you rate this animation? <span className="asterisk">*</span></h2>
                    <div className="rating-list">
                        {RATING_OPTIONS.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => updateClipAnswer(currentClip.id, 'rating', opt)}
                                className={`rating-btn ${clipAnswer.rating === opt ? 'rating-btn-active' : ''}`}
                            >
                                <div className="radio-circle">
                                    {clipAnswer.rating === opt && <div className="radio-circle-fill" />}
                                </div>
                                <span className="rating-text">{opt}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="question-card">
                    <h2 className="question-title">
                        2. What issue(s) did you notice in the animation?
                        {(clipAnswer.rating?.startsWith('1') || clipAnswer.rating?.startsWith('2')) && <span className="asterisk">*</span>}
                    </h2>
                    <p className="question-desc">Select all that apply.</p>

                    <div className="issues-grid">
                        {ISSUE_OPTIONS.map((issue) => {
                            const isChecked = clipAnswer.issues?.includes(issue);
                            return (
                                <label key={issue} className={`issue-label ${isChecked ? 'issue-label-active' : ''}`}>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={isChecked || false}
                                        onChange={() => toggleIssue(currentClip.id, issue)}
                                    />
                                    <div className="checkbox-box">
                                        {isChecked && <Check size={14} color="white" />}
                                    </div>
                                    <span className="issue-text">{issue}</span>
                                </label>
                            );
                        })}
                    </div>

                    <div className="other-input-wrap">
                        <span className="other-label">Other:</span>
                        <input
                            type="text"
                            placeholder="Describe any other issues..."
                            value={clipAnswer.other || ''}
                            onChange={(e) => updateClipAnswer(currentClip.id, 'other', e.target.value)}
                            className="other-input"
                        />
                    </div>
                </div>

                <div className="action-bar">
                    <button
                        onClick={handleNext}
                        disabled={isSubmitting || !clipAnswer.rating}
                        className="btn-primary"
                    >
                        {isSubmitting ? 'Saving...' : step === survey.clips.length - 1 ? 'Submit Evaluation' : 'Next Clip'}
                        {step === survey.clips.length - 1 ? <Check size={20} /> : <ArrowRight size={20} />}
                    </button>
                </div>

            </div>
        </div>
    );
}

// ==========================================
// ADMIN DASHBOARD
// ==========================================
function AdminDashboard({ surveys, setSurveys, activeAdminSurveyId, setActiveAdminSurveyId }) {
    const [activeTab, setActiveTab] = useState('surveys');
    const [surveyCounts, setSurveyCounts] = useState({});

    const activeAdminSurvey = surveys.find(s => s.id === activeAdminSurveyId);

    // Fetch submission counts from CountAPI for all surveys
    useEffect(() => {
        surveys.forEach(survey => {
            fetch(`https://api.countapi.xyz/get/bxd-voc-survey/${survey.id}`)
                .then(r => r.json())
                .then(data => {
                    if (data.value !== undefined) {
                        setSurveyCounts(prev => ({ ...prev, [survey.id]: data.value }));
                    }
                })
                .catch(() => { }); // Silently fail — not critical
        });
    }, [surveys.length]);

    const createSurvey = () => {
        const newSurvey = {
            id: `survey-${Date.now()}`,
            name: `New Survey ${surveys.length + 1}`,
            dateCreated: new Date().toISOString().split('T')[0],
            status: 'draft',
            clips: []
        };
        setSurveys([...surveys, newSurvey]);
        setActiveAdminSurveyId(newSurvey.id);
        setActiveTab('config');
    };

    const deleteSurvey = (id) => {
        if (window.confirm('Are you sure you want to delete this survey and all collected responses? This cannot be undone.')) {
            const updatedSurveys = surveys.filter(s => s.id !== id);
            setSurveys(updatedSurveys);
            if (activeAdminSurveyId === id) {
                setActiveAdminSurveyId(updatedSurveys.length > 0 ? updatedSurveys[0].id : null);
            }
        }
    };

    const togglePublished = (id) => {
        setSurveys(surveys.map(s =>
            s.id === id
                ? { ...s, status: s.status === 'published' ? 'draft' : 'published' }
                : s
        ));
    };

    const updateSurveyName = (id, newName) => {
        setSurveys(surveys.map(s => s.id === id ? { ...s, name: newName } : s));
    };

    const addClip = () => {
        if (!activeAdminSurvey) return;
        const newClip = {
            id: `clip-${Date.now()}`,
            title: `Animation Clip ${activeAdminSurvey.clips.length + 1}`,
            adminTitle: '',
            url: ''
        };
        const updatedClips = [...activeAdminSurvey.clips, newClip];
        setSurveys(surveys.map(s => s.id === activeAdminSurveyId ? { ...s, clips: updatedClips } : s));
    };

    const updateClip = (id, field, value) => {
        if (!activeAdminSurvey) return;
        const updatedClips = activeAdminSurvey.clips.map(c =>
            c.id === id ? { ...c, [field]: value } : c
        );
        setSurveys(surveys.map(s => s.id === activeAdminSurveyId ? { ...s, clips: updatedClips } : s));
    };

    const removeClip = (id) => {
        if (!activeAdminSurvey) return;
        const updatedClips = activeAdminSurvey.clips.filter(c => c.id !== id);
        setSurveys(surveys.map(s => s.id === activeAdminSurveyId ? { ...s, clips: updatedClips } : s));
    };

    const saveToFile = () => {
        if (!activeAdminSurvey) return;

        const dl = (filename, data) => {
            const blob = new Blob([JSON.stringify(data, null, 4)], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        // 1. Download the individual survey file
        const surveyData = { ...activeAdminSurvey };
        dl(`${activeAdminSurvey.id}.json`, surveyData);

        // 2. Download the updated index.json (staggered to avoid popup blockers)
        const allIds = surveys.map(s => s.id);
        if (!allIds.includes(activeAdminSurvey.id)) allIds.push(activeAdminSurvey.id);
        setTimeout(() => dl('index.json', { surveys: allIds }), 500);
    };

    return (
        <div className="admin-screen">
            <div className="admin-header">
                <h1 className="admin-title">Platform Management</h1>
                <p className="admin-desc">Configure evaluation clips and export BXD mocap data.</p>
            </div>

            <div className="admin-tabs">
                <button
                    onClick={() => setActiveTab('surveys')}
                    className={`admin-tab ${activeTab === 'surveys' ? 'admin-tab-active' : ''}`}
                >
                    <Settings size={18} /> Manage Surveys
                </button>
                <button
                    onClick={() => setActiveTab('config')}
                    disabled={!activeAdminSurveyId}
                    className={`admin-tab ${activeTab === 'config' ? 'admin-tab-active' : ''}`}
                    style={{ opacity: !activeAdminSurveyId ? 0.5 : 1, cursor: !activeAdminSurveyId ? 'not-allowed' : 'pointer' }}
                >
                    <Video size={18} /> Edit Clips
                </button>
            </div>

            {!activeAdminSurveyId && activeTab !== 'surveys' && (
                <div className="empty-state">
                    <p>Select a survey from the 'Manage Surveys' tab to edit or view responses.</p>
                </div>
            )}

            {activeTab === 'surveys' && (
                <div style={{ animation: 'fadeIn 0.3s' }}>
                    <div className="section-header-row">
                        <h2 className="section-title">All Surveys</h2>
                        <button onClick={createSurvey} className="btn-secondary">
                            <Plus size={16} /> Create New Survey
                        </button>
                    </div>

                    <div className="rotation-info" style={{ marginBottom: '1rem' }}>
                        <Info size={14} />
                        All <strong>Published</strong> surveys rotate daily on the main URL. Draft surveys are hidden from public visitors.
                    </div>

                    <div className="survey-list">
                        {surveys.map((survey) => (
                            <div key={survey.id} className={`survey-item ${activeAdminSurveyId === survey.id ? 'survey-item-active' : ''}`}>
                                <div className="survey-info">
                                    <div className="survey-name">
                                        {activeAdminSurveyId === survey.id ? (
                                            <input
                                                type="text"
                                                value={survey.name}
                                                onChange={(e) => updateSurveyName(survey.id, e.target.value)}
                                                style={{ background: 'transparent', border: '1px solid #3f3f46', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', outline: 'none', minWidth: '300px' }}
                                            />
                                        ) : (
                                            survey.name
                                        )}
                                    </div>
                                    <div className="survey-meta">
                                        <span>Created: {survey.dateCreated}</span>
                                        <span>Clips: {survey.clips.length}</span>
                                        <span>Submissions: {surveyCounts[survey.id] ?? '—'}</span>
                                        <span className={`survey-status ${survey.status === 'published' ? 'status-published' : 'status-draft'}`}>
                                            {survey.status === 'published' ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                </div>
                                <div className="survey-actions">
                                    <button
                                        onClick={() => togglePublished(survey.id)}
                                        className="btn-secondary"
                                        style={survey.status === 'published'
                                            ? { backgroundColor: 'rgba(161,161,170,0.15)', color: '#a1a1aa' }
                                            : { backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}
                                    >
                                        {survey.status === 'published' ? 'Unpublish' : 'Publish'}
                                    </button>
                                    {activeAdminSurveyId !== survey.id && (
                                        <button onClick={() => { setActiveAdminSurveyId(survey.id); setActiveTab('config'); }} className="btn-secondary">
                                            Edit
                                        </button>
                                    )}
                                    <button onClick={() => deleteSurvey(survey.id)} className="btn-remove" title="Delete Survey">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'config' && activeAdminSurveyId && (
                <div style={{ animation: 'fadeIn 0.3s' }}>
                    {/* Publish toggle bar */}
                    <div className="publish-toggle-bar">
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={activeAdminSurvey.status === 'published'}
                                onChange={() => togglePublished(activeAdminSurveyId)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                        <span className="publish-toggle-label">
                            {activeAdminSurvey.status === 'published'
                                ? <><span style={{ color: '#4ade80', fontWeight: 600 }}>Published</span> — included in the daily rotation</>
                                : <><span style={{ color: '#a1a1aa', fontWeight: 600 }}>Draft</span> — hidden from public visitors</>}
                        </span>
                    </div>

                    <div className="section-header-row">
                        <h2 className="section-title" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '60%' }}>Clips to Evaluate: {activeAdminSurvey.name}</h2>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={saveToFile} className="btn-secondary" title="Download JSON files → put in public/surveys/ → commit">
                                <Download size={16} /> Save to File
                            </button>
                            <button onClick={addClip} className="btn-secondary">
                                <Plus size={16} /> Add Clip
                            </button>
                        </div>
                    </div>

                    <div className="clip-list">
                        {activeAdminSurvey.clips.map((clip, index) => (
                            <div key={clip.id} className="clip-item">
                                <div className="clip-num">{index + 1}.</div>
                                <div className="clip-fields">
                                    <div className="clip-field">
                                        <label className="clip-label">Clip Title</label>
                                        <input
                                            type="text"
                                            value={clip.title}
                                            onChange={(e) => updateClip(clip.id, 'title', e.target.value)}
                                            placeholder="e.g., Run Cycle Test 01"
                                            className="clip-input"
                                        />
                                    </div>
                                    <div className="clip-field">
                                        <label className="clip-label">Admin Title (Export Only / Hidden from Survey)</label>
                                        <input
                                            type="text"
                                            value={clip.adminTitle || ''}
                                            onChange={(e) => updateClip(clip.id, 'adminTitle', e.target.value)}
                                            placeholder="e.g., v1_skate_fixed"
                                            className="clip-input"
                                        />
                                    </div>
                                    <div className="clip-field">
                                        <label className="clip-label">Video URL (YouTube or .mp4)</label>
                                        <div className="clip-url-wrap">
                                            <Video size={16} className="clip-url-icon" />
                                            <input
                                                type="text"
                                                value={clip.url}
                                                onChange={(e) => updateClip(clip.id, 'url', e.target.value)}
                                                placeholder="https://..."
                                                className="clip-url-input"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => removeClip(clip.id)} className="btn-remove" title="Remove Clip">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}

                        {activeAdminSurvey.clips.length === 0 && (
                            <div className="empty-state">
                                <p>No clips configured. Click "Add Clip" to start building your evaluation test.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}