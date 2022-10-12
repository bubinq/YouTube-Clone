import { useState } from "react"

export const useLocalStorage = (key, defaultVal) => {
    const [value, setValue] = useState(() => {
        const hasUser = localStorage.getItem(key)
        const authUser = hasUser? JSON.parse(hasUser) : defaultVal
        return authUser
    })

    const setData = (data) => {
        localStorage.setItem(key, JSON.stringify(data))
        setValue(data)
    }

    return [
        value,
        setData
    ]
}