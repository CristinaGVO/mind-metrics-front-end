import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as goalService from "../../services/goalService";
import { UserContext } from "../../contexts/UserContext";

const GoalDetails = (props) => {
    const { goalId } = useParams();
    const navigate = useNavigate();
    const [goal, setGoal] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchGoal = async () => {
            const goalData = await goalService.show(goalId);
            setGoal(goalData);
        };
        fetchGoal();
    }, [goalId]);

    if (!goal) return <main>Loading...</main>;

    if (goal.err) return <main>{goal.err}</main>;

    const isOwner = goal.userId === user._id;

    const handleDelete = async () => {
        await props.handleDeleteGoal(goalId);
        navigate("/goals");
    };

    return (
        <main>
            <section>
                <header>
                    <h1>{goal.title}</h1>
                    <p><strong>Created on {new Date(goal.createdAt).toLocaleDateString()}</strong></p>


                </header>

                <p>{goal.description}</p>

                <p><strong>Metric:</strong> {goal.targetMetric}</p>
                <p><strong>Target:</strong> {goal.targetValue}</p>
                <p><strong>Start:</strong> {new Date(goal.startDate).toLocaleDateString()}</p>
                <p><strong>End:</strong> {new Date(goal.endDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {goal.status}</p>
                {isOwner && (
                    <>
                        <Link to={`/goals/${goalId}/edit`}>EDIT</Link>
                        <button onClick={handleDelete}>DELETE</button>
                    </>
                )}

            </section>
        </main>
    );
};

export default GoalDetails;