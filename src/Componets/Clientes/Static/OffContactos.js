import React, { useContext, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosClose, IoMdArrowDropup } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { DataContext } from "../Context/DataContext";

export default function Contactos({ isCreating }) {
    const { infoContacto, setInfoContacto, dataContacto } = useContext(DataContext);

    const { register, control, watch, setValue, reset } = useForm({
        defaultValues: {
            contactos: [
                {
                    nombre: '',
                    ciudad: '',
                    proveedor: '',
                    fuente: '',
                    cargo: '',
                    info: [{ telefono: '', email: '' }]
                }
            ]
        }
    });

    const { fields: contactosFields, append: appendContacto, remove: removeContacto } = useFieldArray({
        control,
        name: "contactos"
    });

    const [expandedContacto, setExpandedContacto] = useState(contactosFields.length - 1);

    const obtenerPorcion = (arr, start, size) => arr.slice(start, start + size);

    const handleAppendContacto = () => {
        if (contactosFields.length < 3) {
            appendContacto({
                nombre: "",
                ciudad: "",
                proveedor: "",
                fuente: "",
                cargo: "",
                info: [{ telefono: "", email: "" }]
            });
            setExpandedContacto(contactosFields.length);
        } else {
            alert("No puedes agregar más de 3 contactos.");
        }
    };

    const fieldsData = watch("contactos");

    useEffect(() => {
        setInfoContacto(fieldsData);
    }, [fieldsData]);

    useEffect(() => {
        if (!isCreating && dataContacto) {
            const nombreArray = Array.isArray(dataContacto.nombre) ? dataContacto.nombre : [dataContacto.nombre];
            const ciudadArray = Array.isArray(dataContacto.ciudad) ? dataContacto.ciudad : [dataContacto.ciudad];
            const proveedorArray = Array.isArray(dataContacto.proveedor) ? dataContacto.proveedor : [dataContacto.proveedor];
            const fuenteArray = Array.isArray(dataContacto.fuente) ? dataContacto.fuente : [dataContacto.fuente];
            const cargoArray = Array.isArray(dataContacto.cargo) ? dataContacto.cargo : [dataContacto.cargo];

            const telefonoArray = dataContacto.info && dataContacto.info[0] && Array.isArray(dataContacto.info[0].telefono)
                ? dataContacto.info[0].telefono
                : [dataContacto.info?.telefono || ""];
            const emailArray = dataContacto.info && dataContacto.info[0] && Array.isArray(dataContacto.info[0].email)
                ? dataContacto.info[0].email
                : [dataContacto.info?.email || ""];

            const contactos = nombreArray.map((nombre, index) => {
                const start = index * 3; // Up to 3 phone numbers/emails per contact
                return {
                    nombre: nombre || "",
                    ciudad: ciudadArray[index] || "",
                    proveedor: proveedorArray[index] || "",
                    fuente: fuenteArray[index] || "",
                    cargo: cargoArray[index] || "",
                    info: obtenerPorcion(telefonoArray, start, 3).map((telefono, i) => ({
                        telefono: telefono || "Pendiente",
                        email: obtenerPorcion(emailArray, start, 3)[i] || "Pendiente"
                    }))
                };
            });

            setValue("contactos", contactos);
        } else {
            reset({
                contactos: [
                    {
                        nombre: '',
                        ciudad: '',
                        proveedor: '',
                        fuente: '',
                        cargo: '',
                        info: [{ telefono: '', email: '' }]
                    }
                ]
            });
        }
    }, [dataContacto, isCreating, setValue, reset]);

    const preventSemicolonInput = (e) => {
        if (e.target.value.includes(';')) {
            e.target.value = e.target.value.replace(/;/g, '');
        }
    };

    return (
        <div>
            <div onClick={handleAppendContacto}>
                <div
                    style={{
                        flexGrow: 1,
                        borderBottom: "1px solid gray",
                        backgroundColor: "transparent",
                        marginBottom: "0.25rem",
                        marginTop: "0.25rem",
                        alignSelf: "center",
                        marginBottom: "1.25rem"
                    }}
                />
                <label htmlFor="info" className="form-label mt-1" style={{ marginRight: '0.5rem', }}>
                    Añadir Contacto
                </label>
                <CiCirclePlus
                    type="button"
                    className="rounded "
                    style={{ fontSize: '20px' }}
                />
            </div>
            <ul>
                {contactosFields.map((contacto, index) => (
                    <li key={contacto.id}>
                        <div className="flex justify-between items-center mb-2">
                            <div className="contacto mb-3 mt-3">
                                <div
                                    style={{
                                        flexGrow: 1,
                                        borderBottom: "1px solid gray",
                                        backgroundColor: "transparent",
                                        marginBottom: "0.25rem",
                                        marginTop: "0.25rem",
                                        alignSelf: "center"
                                    }}
                                />
                                <label style={{ marginRight: "8px", fontSize: "16px", whiteSpace: "nowrap", marginLeft: "8px" }}>
                                    {index + 1 === 1 ? (
                                        "Primer contacto"
                                    ) : index + 1 === 2 ? (
                                        "Segundo contacto"
                                    ) : index + 1 === 3 ? (
                                        "Tercer contacto"
                                    ) : (
                                        `Contacto ${index + 1}`
                                    )}
                                </label>
                                <div
                                    style={{
                                        fontSize: "20px",
                                        marginRight: "10px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                    type="button"
                                    onClick={() => setExpandedContacto(expandedContacto === index ? null : index)}>
                                    {expandedContacto === index ? <MdOutlineArrowDropDown /> : <IoMdArrowDropup />}
                                </div>
                                <div
                                    style={{
                                        flexGrow: 1,
                                        borderBottom: "1px solid gray",
                                        backgroundColor: "transparent",
                                        marginBottom: "0.25rem",
                                        marginTop: "0.25rem",
                                        alignSelf: "center"
                                    }}
                                />
                            </div>
                        </div>

                        {expandedContacto === index && (
                            <div>
                                <div className="input-group">
                                    <div className="col-sm-4 m-1">
                                        <label htmlFor="empresa" className="form-label">
                                            Nombre Contacto
                                        </label>
                                        <input
                                            {...register(`contactos.${index}.nombre`)}
                                            placeholder="Nombre Contacto"
                                            className="form-control"
                                            style={{ marginRight: '20px', borderRadius: '5px' }}
                                            onChange={(e) => {
                                                preventSemicolonInput(e);
                                                const formattedValue = e.target.value
                                                    .toLowerCase()
                                                    .split(' ')
                                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                    .join(' ');
                                                setValue(`contactos.${index}.nombre`, formattedValue);
                                            }}
                                        />
                                    </div>

                                    <div className="col-sm-3 m-1">
                                        <label htmlFor="empresa" className="form-label">
                                            Ciudad
                                        </label>
                                        <input {...register(`contactos.${index}.ciudad`)} placeholder="Ciudad" className="form-control"
                                            style={{ marginRight: '20px', borderRadius: '5px' }}
                                            onChange={(e) => {
                                                preventSemicolonInput(e);
                                                setValue(`contactos.${index}.ciudad`,
                                                    e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
                                            }}
                                        />
                                    </div>

                                    <div className="col-sm-4 m-1">
                                        <label htmlFor="empresa" className="form-label">
                                            Proveedor
                                        </label>
                                        <input {...register(`contactos.${index}.proveedor`)} placeholder="Proveedor" className="form-control"
                                            style={{ marginRight: '20px', borderRadius: '5px' }}
                                            onChange={(e) => {
                                                preventSemicolonInput(e);
                                                setValue(`contactos.${index}.proveedor`,
                                                    e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
                                            }}
                                        />
                                    </div>

                                    <div className="col-sm-4 m-1">
                                        <label htmlFor="empresa" className="form-label">
                                            Fuente
                                        </label>
                                        <input {...register(`contactos.${index}.fuente`)} placeholder="Fuente" className="form-control" style={{ marginRight: '20px', borderRadius: '5px' }}
                                            onChange={preventSemicolonInput}
                                        />
                                    </div>

                                    <div className="col-sm-4 m-1">
                                        <label htmlFor="empresa" className="form-label">
                                            Cargo
                                        </label>
                                        <input {...register(`contactos.${index}.cargo`)} placeholder="Cargo" className="form-control" style={{ marginRight: '20px', borderRadius: '5px' }}
                                            onChange={(e) => {
                                                preventSemicolonInput(e);
                                                setValue(`contactos.${index}.cargo`,
                                                    e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
                                            }}
                                        />
                                    </div>

                                    <div className="col-sm-1 m-1 mt-4 pt-3">
                                        <IoIosClose
                                            type="button"
                                            className="rounded"
                                            style={{ fontSize: '30px' }}
                                            onClick={() => removeContacto(index)}
                                        />
                                    </div>
                                </div>
                                <ul>
                                    <InfoContacto control={control} index={index} register={register} />
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

        </div>
    );
}

function InfoContacto({ control, register, index }) {
    const { fields: infoFields, append: appendInfo, remove: removeInfo } = useFieldArray({
        control,
        name: `contactos.${index}.info`
    });

    const preventSemicolonInput = (e) => {
        if (e.target.value.includes(';')) {
            e.target.value = e.target.value.replace(/;/g, '');
        }
    };

    return (
        <div>
            <ul>
                <label htmlFor="info" className="form-label mt-3" style={{ marginRight: '0.5rem' }}>
                    Información De Contacto
                </label>
                <CiCirclePlus
                    type="button"
                    className="rounded "
                    style={{ fontSize: '20px' }}
                    onClick={() => {
                        if (infoFields.length < 3) {
                            appendInfo({ telefono: "", email: "" });
                        } else {
                            alert("No puedes agregar más de 3 entradas de información.");
                        }
                    }}
                />
                {infoFields.map((info, subIndex) => (
                    <li key={info.id}>
                        <div className="input-group mt-3">
                            <input
                                {...register(`contactos.${index}.info.${subIndex}.telefono`)}
                                placeholder="Teléfono"
                                className="form-control"
                                style={{ marginRight: '20px', borderRadius: '5px' }}
                                onChange={preventSemicolonInput}
                            />
                            <input
                                {...register(`contactos.${index}.info.${subIndex}.email`)}
                                placeholder="Email"
                                className="form-control"
                                style={{ marginRight: '10px', borderRadius: '5px' }}
                                onChange={preventSemicolonInput}
                            />
                            <IoIosClose
                                type="button"
                                className="rounded mt-1"
                                style={{ fontSize: '30px' }}
                                onClick={() => removeInfo(subIndex)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
