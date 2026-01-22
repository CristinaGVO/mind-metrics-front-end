import { Link } from "react-router";

const GoalList = ({ goals }) => {
    return (
        <main>
            {goals.map((goal) => (
                <Link key={goal._id} to={`/goals/${goal._id}`}>
                    <article>
                        <header>
                            <h2>{goal.title}</h2>
                            <p>
                                {`${goal.targetMetric} → ${goal.targetValue} | ${goal.status}`}
                            </p>
                            <p>
                                {`Created on ${new Date(goal.createdAt).toLocaleDateString()}`}
                            </p>
                        </header>
                        <p>{goal.description}</p>
                    </article>
                </Link>
            ))}
        </main>
    );
};

export default GoalList;
