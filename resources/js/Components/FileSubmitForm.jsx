import InputError from "@/Components/InputError.jsx";
import {Button, DialogPanel, Dialog} from "@tremor/react";
import {useForm} from "@inertiajs/react";

export default function ({isOpen, setIsOpen, onSubmit, title}){
    const { data, setData, post, processing, errors } = useForm({
        import_file: null,
    })

    const submitFile = (e) => {
        e.preventDefault();
        if (onSubmit)
            onSubmit(data);
    }

    return <>
        <Dialog open={isOpen} onClose={setIsOpen} static={true}>
            <DialogPanel>
                <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">{title}</h3>
                <form onSubmit={submitFile} encType="multipart/form-data" className="mt-3">
                    <input type="file" name="import_file" id="import_file" className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
                                                file:border-0
                                                file:bg-gray-100 file:me-4
                                                file:py-2 file:px-4
                                                dark:file:bg-gray-700 dark:file:text-gray-400"
                           onChange={e => setData('import_file', e.target.files[0])}
                    />
                    <InputError message={errors.import_file} className="mt-2"/>

                    <Button className="mt-8 w-full" onClick={() => setIsOpen(false)}>
                        Xác nhận
                    </Button>
                </form>
            </DialogPanel>
        </Dialog>
    </>
}
