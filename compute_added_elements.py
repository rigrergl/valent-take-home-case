from pulp import *


def compute_added_elements(q, p, w):
    with open("output.txt", "a") as f:
        # Create the optimization problem
        prob = LpProblem("Minimize_Y", LpMinimize)

        # Define the decision variables and their lower bounds
        x = [pulp.LpVariable(f"x{i}", lowBound=0) for i in range(1, 11)]
        y = pulp.LpVariable("y", lowBound=100)

        # Add the objective function
        prob += y, "Objective Function"

        # Define the constraints and add them to the problem
        for i in range(10):
            prob += (q[i]*w + x[i]) == y*p[i], f"Constraint {i+1}"

        prob += y == w + lpSum(x), "New Constraint"

        # Solve the problem
        prob.solve()

        # Print the results
        f.write("q: " + str(q) + "\n")
        f.write("p: " + str(p) + "\n")
        f.write("q: " + str(q) + "\n")
        f.write("Status: " + str(LpStatus[prob.status]) + "\n")
        f.write("Optimal value of y: " + str(value(prob.objective)) + "\n")
        f.write("Optimal values of x: " + str([value(x[i]) for i in range(0, 10)]) + "\n\n")

        return value(prob.objective), x  # minimum final weight, quantities of each element to be added


def test():
    # Test 1: given
    q = [0.1479, 0.02, 0.005, 0.0001, 0.01, 0.0003, 0.0002, 0.006, 0.0005, 0.81]
    p = [0.17, 0.12, 0.025, 0.0008, 0.02, 0.0005, 0.0003, 0.0075, 0.001, 0.6549]
    w = 100

    optimal_y, optimal_x = compute_added_elements(q, p, w)

    total_percentage = 0
    for i in range(len(q)):
        assert ((q[i] * w + optimal_x[i]) / optimal_y) == p[i]
        total_percentage += (q[i] * w + optimal_x[i]) / optimal_y
    assert total_percentage == 100.0

    # Test 2: with a zero initial percentage
    q = [0.1479, 0.025, 0, 0.0001, 0.01, 0.0003, 0.0002, 0.006, 0.0005, 0.81]
    p = [0.17, 0.12, 0.025, 0.0008, 0.02, 0.0005, 0.0003, 0.0075, 0.001, 0.6549]
    w = 100

    optimal_y, optimal_x = compute_added_elements(q, p, w)

    total_percentage = 0
    for i in range(len(q)):
        assert ((q[i] * w + optimal_x[i]) / optimal_y) == p[i]
        total_percentage += (q[i] * w + optimal_x[i]) / optimal_y
    assert total_percentage == 100.0

    # Test 3: infeasible (0 on results)
    q = [0.1479, 0.02, 0.005, 0.0001, 0.01, 0.0003, 0.0002, 0.006, 0.0005, 0.81]
    p = [0.17, 0.145, 0, 0.0008, 0.02, 0.0005, 0.0003, 0.0075, 0.001, 0.6549]
    w = 100

    optimal_y, optimal_x = compute_added_elements(q, p, w)

    total_percentage = 0
    for i in range(len(q)):
        assert ((q[i] * w + optimal_x[i]) / optimal_y) == p[i]
        total_percentage += (q[i] * w + optimal_x[i]) / optimal_y
    assert total_percentage == 100.0

    # Test 4: infeasible (initial percentages do not add to 100)
    q = [0.1479, 0, 0.005, 0.0001, 0.01, 0.0003, 0.0002, 0.006, 0.0005, 0.81]
    p = [0.17, 0.12, 0.025, 0.0008, 0.02, 0.0005, 0.0003, 0.0075, 0.001, 0.6549]
    w = 100

    optimal_y, optimal_x = compute_added_elements(q, p, w)

    total_percentage = 0
    for i in range(len(q)):
        assert ((q[i] * w + optimal_x[i]) / optimal_y) == p[i]
        total_percentage += (q[i] * w + optimal_x[i]) / optimal_y
    assert total_percentage == 100.0


if __name__ == "__main__":
    test()
