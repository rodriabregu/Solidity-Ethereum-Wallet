const TasksContract = artifacts.require("TasksContract")

contract("TasksContract", () => {

    before(async () => {
        this.tasksContract = await TasksContract.deployed();
    });

    it('migrate deployed successfully', async () => {
        const address = this.tasksContract.address;
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    });

    it('get Tasks list', async () => {
        const tasksCounter = await this.tasksContract.taskCounter();
        const task = await this.tasksContract.tasks(tasksCounter);
        assert.equal(task.id.toNumber(), tasksCounter);
        assert.equal(task.title, "Tarea de ej");
        assert.equal(task.description, "Ejemplo de descripcion papu");
        assert.equal(task.done, false);
        assert.equal(tasksCounter, 1);
    });

    it('task created successfully', async () => {
        const taskSuccess = await this.tasksContract.createTask("some task", "description two");
        const taskEvent = taskSuccess.logs[0].args;
        const tasksCounter = await this.tasksContract.taskCounter();
        assert.equal(tasksCounter, 2)
        assert.equal(taskEvent.id.toNumber(), 2);
        assert.equal(taskEvent.title, "some task");
        assert.equal(taskEvent.description, "description two");
        assert.equal(taskEvent.done, false);
    });

});