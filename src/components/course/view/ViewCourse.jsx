import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { createUnit } from '../../../redux/course/actions';
import { v4 as uuidv4 } from 'uuid';
import EditBlock from '../edit/EditBlock';
import NewModal from '../edit/NewModal';
import ToolbarRight from './toolbars/ToolbarRight';
import ToolbarBottom from './toolbars/ToolbarBottom';

const ViewCourse = props => {
    const [showNewUnitModal, setShowNewUnitModel] = useState(false);
    const [newUnit, setNewUnit] = useState('')
    const [modalMessage, setModalMessage] = useState('');
    const course = useSelector(state => state.courses[props.match.params.courseID])
    const dispatch = useDispatch();

    const showModal = () => {
        setModalMessage('');
        setShowNewUnitModel(true)
    }

    const hideModal = () => {
        setShowNewUnitModel(false)
    }

    const scrollBottom = () => {
        window.scroll({
            top: document.body.offsetHeight,
            bottom: 0,
            behavior: 'smooth',
        });
    }

    const onCreateNewUnitClick = () => {
        const existingUnitNames = [];
        course.content.forEach(unit => existingUnitNames.push(unit.title))

        if (newUnit.length === 0) {
            console.log('works')
            setModalMessage("Please provide a name for your new unit above.")
        }

        else if (existingUnitNames.includes(newUnit)) {
            setModalMessage("It looks like you already have a unit with that name.")
        }

        else {
            hideModal();
            dispatch(createUnit({ courseParam: props.match.params.courseID, unitTitle: newUnit }));
            setNewUnit('');
            setTimeout(() => scrollBottom(), 1000);
        }
    }

    const COURSE = "COURSE";
    const UNIT = "UNIT";

    return (
        <div className="view-course">
            <NewModal isOpen={showNewUnitModal} onRequestClose={hideModal} setNewUnit={setNewUnit} onCreateNewUnitClick={onCreateNewUnitClick} modalMessage={modalMessage} hideModal={hideModal} />

            <EditBlock type={COURSE} title={course.title} description={course.description} courseParam={props.match.params.courseID} key={uuidv4()} />

            {course.content.map((unit, idx) => <EditBlock idx={idx} type={UNIT} title={unit.title} description={unit.description} courseParam={props.match.params.courseID} content={unit.content} key={uuidv4()} />)}

            <ToolbarRight showModal={showModal} />
            <ToolbarBottom showModal={showModal} />

        </div>
    )
}

export default withRouter(ViewCourse);