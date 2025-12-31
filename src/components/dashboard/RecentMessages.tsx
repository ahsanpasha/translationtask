"use client";

import React, { useState, useMemo } from "react";
import { Tooltip } from "../ui/Tooltip";

interface Message {
    id: string;
    sender: string;
    subject: string;
    preview: string;
    timestamp: string;
    isRead: boolean;
    isImportant: boolean;
    avatar: string;
}

interface Props {
    messages: Message[];
}

type Filter = "All" | "Unread" | "Important";

const ITEMS_PER_PAGE = 6;
const FILTERS: Filter[] = ["All", "Unread", "Important"];

export default function RecentMessages({ messages }: Props) {
    const [filter, setFilter] = useState<Filter>("All");
    const [page, setPage] = useState(1);
    const [openId, setOpenId] = useState<string | null>(null);

    const filtered = useMemo(() => {
        if (filter === "Unread") return messages.filter(m => !m.isRead);
        if (filter === "Important") return messages.filter(m => m.isImportant);
        return messages;
    }, [messages, filter]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const current = filtered.slice(start, start + ITEMS_PER_PAGE);

    const changeFilter = (f: Filter) => {
        setFilter(f);
        setPage(1);
        setOpenId(null);
    };

    const changePage = (p: number) => {
        if (p >= 1 && p <= totalPages) {
            setPage(p);
            setOpenId(null);
        }
    };

    const action = (name: string, id: string) =>
        console.log(`${name}:`, id);

    return (
        <div className="bg-white rounded-xl  shadow-sm min-h-[600px] flex flex-col">
            {/* Header */}
            <Header filter={filter} onChange={changeFilter} />

            {/* Messages */}
            <div className="p-5 flex-1">
                {current.length ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {current.map(msg => (
                            <MessageCard
                                key={msg.id}
                                message={msg}
                                open={openId === msg.id}
                                onToggle={() =>
                                    setOpenId(openId === msg.id ? null : msg.id)
                                }
                                onAction={action}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState />
                )}
            </div>

            {/* Pagination */}
            {filtered.length > ITEMS_PER_PAGE && (
                <Pagination
                    page={page}
                    total={totalPages}
                    start={start}
                    count={filtered.length}
                    onChange={changePage}
                />
            )}
        </div>
    );
}


const Header = ({ filter, onChange }: any) => (
    <div className="flex justify-between items-center  p-5">
        <h2 className="font-bold text-lg">Recent Messages</h2>
        <div className="flex gap-2">
            {FILTERS.map(f => (
                <button
                    key={f}
                    onClick={() => onChange(f)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg ${filter === f
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {f}
                </button>
            ))}
        </div>
    </div>
);

const MessageCard = ({ message, open, onToggle, onAction }: any) => (
    <div
        onClick={onToggle}
        className={`rounded-lg  p-4 cursor-pointer transition ${message.isRead ? "bg-white" : "bg-blue-50"
            } hover:shadow-md`}
    >
        <div className="flex gap-3 mb-3">
            <Avatar text={message.avatar} />
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm">{message.sender}</h3>
                    {message.isImportant && <Star />}
                </div>
                <p className="text-xs text-gray-500">{message.timestamp}</p>
            </div>
            {!message.isRead && <Dot />}
        </div>

        <h4 className="font-semibold text-sm mb-1 line-clamp-1">
            {message.subject}
        </h4>

        <p className={`text-xs text-gray-600 ${open ? "" : "line-clamp-2"}`}>
            {message.preview}
        </p>

        <Actions
            onClick={(type: string) => onAction(type, message.id)}
        />
    </div>
);

const Actions = ({ onClick }: any) => (
    <div
        className="flex gap-1 mt-3 pt-3 "
        onClick={e => e.stopPropagation()}
    >
        {["Reply", "Read", "Archive", "Delete"].map(a => (
            <Tooltip key={a} text={a}>
                <button
                    onClick={() => onClick(a)}
                    className="flex-1 p-2 rounded hover:bg-gray-100 text-xs font-bold"
                >
                    {a}
                </button>
            </Tooltip>
        ))}
    </div>
);

const Pagination = ({ page, total, start, count, onChange }: any) => (
    <div className="flex justify-between items-center  p-4 text-xs">
        <span>
            Showing <b>{start + 1}</b> –{" "}
            <b>{Math.min(start + ITEMS_PER_PAGE, count)}</b> of{" "}
            <b>{count}</b>
        </span>

        <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => onChange(page - 1)}>
                Prev
            </button>

            {Array.from({ length: total }, (_, i) => (
                <button
                    key={i}
                    onClick={() => onChange(i + 1)}
                    className={page === i + 1 ? "font-bold text-blue-600" : ""}
                >
                    {i + 1}
                </button>
            ))}

            <button disabled={page === total} onClick={() => onChange(page + 1)}>
                Next
            </button>
        </div>
    </div>
);


const Avatar = ({ text }: any) => (
    <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
        {text}
    </div>
);

const Dot = () => <div className="h-2 w-2 bg-blue-600 rounded-full" />;

const Star = () => <span className="text-amber-500">★</span>;

const EmptyState = () => (
    <p className="text-center text-gray-400 py-12">
        No messages found
    </p>
);
