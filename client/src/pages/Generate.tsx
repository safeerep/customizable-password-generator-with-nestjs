import { useState } from "react"
import { AiOutlineThunderbolt } from "react-icons/ai"
import { BiCopy } from "react-icons/bi"
import { GrSave } from "react-icons/gr"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../context/store"
import { generatePassword, storePassword } from "../context/actions/actions"
import { Modal } from "../components"

type CheckBox = {
    label: string;
    checked: boolean;
}

export default () => {
    const dispatch: AppDispatch = useDispatch()
    const password = useSelector((state: RootState) => state.user.data?.password)
    const [passwordLength, setPasswordLength] = useState('')
    const [passwordLengthError, setPasswordLengthError] = useState<boolean | string>(false)
    const [inputFieldsError, setInputFieldsError] = useState<boolean | string>(false)
    const [storePasswordModalOpen, setStorePasswordModalOpen] = useState<boolean>(false)
    const [checkboxes, setCheckboxes] = useState<CheckBox[]>([
        { label: 'Include uppercase', checked: true },
        { label: 'Include lowercase', checked: true },
        { label: 'Include numbers', checked: true },
        { label: 'Include special-chars', checked: true }
    ]);

    const handleCheckboxChange = (label: string) => {
        setCheckboxes(prevCheckboxes => {
            return prevCheckboxes.map(checkbox => {
                if (checkbox.label === label) {
                    return { ...checkbox, checked: !checkbox.checked };
                }
                return checkbox;
            });
        });
    };

    const handleCopy = () => {
        if (password === "") {
            toast.error("Generate first to copy")
        } else {
            navigator.clipboard.writeText(password)
                .then(() => {
                    toast.success("Password copied successfully")
                })
                .catch((err: any) => {
                    console.log(`something went wrong during copying the text to clipboard ${err}`);
                    toast.error(`something went wrong during copying the text to clipboard ${err}`)
                })
        }
    }

    const handleSubmit = () => {
        setInputFieldsError(false)
        const requirements: string[] = []
        checkboxes.forEach((cond: CheckBox) => {
            if (cond.checked) {
                const requirement: string[] = cond.label.split(' ')
                requirements.push(requirement[requirement.length - 1])
            }
        })
        if (requirements.length === 0 ||
            passwordLength === ''
        ) {
            if (requirements.length === 0) {
                setInputFieldsError("please include at least one type of character")
            }
            else {
                setPasswordLengthError("Give a length for the password")
            }
            return;
        }
        else if (Number(passwordLength) > 3) {
            const obj = {
                requirements,
                passwordLength
            }
            dispatch(generatePassword(obj))
        }
    }

    const handleStorePassword = async (title: string) => {
        setStorePasswordModalOpen(!storePasswordModalOpen)
        const obj = {
            title,
            password
        }
        const response: any = await dispatch(storePassword(obj))
        if (response.payload?.success) {
            toast.success(response.payload?.message)
        } else {
            toast.error(response.payload?.message)
        }
    }

    return (
        <div className="w-full bg-blue-950 lg:px-32 px-4 ">
            <div className="flex flex-col justify-center text-4xl h-screen font-bold text-white">
                <h1>Generate </h1>
                <div className="border-b-2 border-green-500 max-w-[400px] ">
                    <h1 className="py-4">Customized passwords</h1>
                </div>
                <label htmlFor="length" className="text-lg">Length of password</label>
                <input type="number"
                    value={passwordLength}
                    onChange={(e) => {
                        if (Number(e.target.value) > 12 || Number(e.target.value) < 4) {
                            setPasswordLengthError("password length should be in between 4-12")
                        } else {
                            setPasswordLengthError(false)
                        }
                        setPasswordLength(e.target.value)
                    }}
                    placeholder="write the length of password"
                    name="length" id=""
                    className="max-w-[250px] rounded-md text-sm p-3 text-black"
                />
                {passwordLengthError && <span className="text-red-600 text-sm">{passwordLengthError}</span>}
                {checkboxes.map(checkbox => (
                    <div key={checkbox.label}>
                        <label className="text-lg">
                            <input
                                type="checkbox"
                                checked={checkbox.checked}
                                onChange={() => handleCheckboxChange(checkbox.label)}
                            />
                            <span className="px-4">
                                {checkbox.label}
                            </span>
                        </label>
                    </div>
                ))}
                {inputFieldsError && <span className="text-red-600 text-sm">{inputFieldsError}</span>}
                <div className="max-w-[400px] rounded-lg mt-4 flex">
                    <div className="relative flex items-center">
                        <input type="text" placeholder="generated password will shows here" className="p-3 rounded-lg bg-white w-[400px] text-black text-lg" value={password} readOnly />
                        {
                            password !== "" &&
                            password !== undefined &&
                            <BiCopy className="absolute right-4 text-black cursor-pointer" onClick={handleCopy} />
                        }
                    </div>
                </div>
                <div className="flex gap-2">
                    {
                        !passwordLengthError &&
                        <button
                            onClick={handleSubmit}
                            className="h-12 bg-green-500 max-w-[250px] rounded-lg mt-4 text-xl text-white font-semibold flex justify-start items-center px-3" >
                            <AiOutlineThunderbolt />
                            {password === "" ? "Generate Password" : "Generate new one"}
                        </button>
                    }
                    {password &&
                        <button
                            onClick={() => setStorePasswordModalOpen(!storePasswordModalOpen)}
                            className="h-12 bg-violet-500 max-w-[100px] rounded-lg mt-4 text-xl text-white font-semibold flex justify-start items-center px-3" >
                            <GrSave />
                            <span className="px-2"> store </span>
                        </button>
                    }
                </div>
            </div>
            <Modal
                afterConfirmation={handleStorePassword}
                isModalOpen={storePasswordModalOpen}
                notesHead="Write a title to remember"
                setModalOpen={setStorePasswordModalOpen}
                submitButtonName="Save password"
            />
        </div>
    )
}