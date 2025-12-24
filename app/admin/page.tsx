"use client"

import { useEffect, useState } from "react"

type Country = {
    id: number
    name: string
}

export default function CountriesAdmin() {
    const [countries, setCountries] = useState<Country[]>([])
    const [name, setName] = useState("")


    const fetchCountries = async () => {
        const res = await fetch("/api/countries")
        const data = await res.json()
        setCountries(data)
    }

    useEffect(() => {
        fetchCountries()
    }, [])


    const handleAdd = async () => {
        if (!name) return
        await fetch("/api/countries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        })
        setName("")
        fetchCountries()
    }

    const handleEdit = async (id: number) => {
        const newName = prompt("New name:")
        if (!newName) return
        await fetch("/api/countries", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name: newName }),
        })
        fetchCountries()
    }


    const handleDelete = async (id: number) => {
        if (!confirm("Delete this country?")) return
        await fetch("/api/countries", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        })
        fetchCountries()
    }

    return (
        <div className="max-w-xl mx-auto mt-10 space-y-4">
            <h1 className="text-2xl font-bold">Countries Admin</h1>


            <div className="flex gap-2">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded flex-1"
                    placeholder="Country name"
                />
                <button
                    onClick={handleAdd}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </div>


            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map((c) => (
                        <tr key={c.id}>
                            <td className="border p-2">{c.id}</td>
                            <td className="border p-2">{c.name}</td>
                            <td className="border p-2 space-x-2">
                                <button
                                    onClick={() => handleEdit(c.id)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(c.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}