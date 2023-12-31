import React from 'react';
import { Card, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";
//i18n
import { useTranslation } from 'react-i18next';

const FilePreview = ({ file }) => {
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <Card className="p-2 mb-2">
                <div className="d-flex align-items-center">
                    <div className="avatar-sm me-3 ms-0">
                        <div className="avatar-title bg-primary-subtle text-primary rounded font-size-20">
                            <i className="ri-file-text-fill"></i>
                        </div>
                    </div>
                    <div className="flex-grow-1">
                        <div className="text-start">
                            <h5 className="font-size-14 mb-1">{file.fileName?.slice(0, 6) + '**' + file.fileName?.slice(-5)}</h5>
                            <p className="text-muted font-size-13 mb-0">{(file.fileSize / 1024).toFixed(2)} KB</p>
                        </div>
                    </div>

                    <div className="ms-4">
                        <ul className="list-inline mb-0 font-size-20">
                            <li className="list-inline-item">
                                <a href={file.document} download={file.document} className="text-muted">
                                    <i className="ri-download-2-line"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Card>
        </React.Fragment>
    )
}

export default FilePreview