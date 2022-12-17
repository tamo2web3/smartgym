const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledSmartGym = require('../ethereum/build/SmartGymContract.json');

let accounts;
let smartgym;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  console.log("accounts:" + accounts[0]);

  smartgym = await new web3.eth.Contract(compiledSmartGym.abi)
    .deploy({data: compiledSmartGym.evm.bytecode.object})
    .send({from: accounts[0], gas: '5000000'});
});

describe('Normal Case', () => {

  it('marks caller as a smartgym manager', async () => {
    const manager = await smartgym.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('create account, workout and input gym', async () => {
    await smartgym.methods.createAccount('name', 0, 170, 55, 50).send({
      from: accounts[0],
      gas: '5000000'
    });

    const accountnum = await smartgym.methods.getAccountLength().call();
    assert.equal(accountnum, 1);

    await smartgym.methods.createWorkout('diet', '20221122').send({
      from: accounts[0],
      gas: '5000000'
    });

    const workoutnum = await smartgym.methods.getWorkoutLength().call();
    assert.equal(workoutnum, 1);

    await smartgym.methods.inputWorkout('20221123', 0, 45, 400, 55, 54, 'Good1').send({
      from: accounts[0],
      gas: '5000000'
    });

    const gymnum = await smartgym.methods.getGymLength().call();
    assert.equal(gymnum, 1);

  });

  it('create account, workout 2 times and input gym', async () => {
    await smartgym.methods.createAccount('name', 0, 170, 55, 50).send({
      from: accounts[0],
      gas: '5000000'
    });

    const accountnum = await smartgym.methods.getAccountLength().call();
    assert.equal(accountnum, 1);

    await smartgym.methods.createWorkout('diet', '20221122').send({
      from: accounts[0],
      gas: '5000000'
    });

    await smartgym.methods.createWorkout('diet2', '20221123').send({
      from: accounts[0],
      gas: '5000000'
    });

    const workoutnum = await smartgym.methods.getWorkoutLength().call();
    assert.equal(workoutnum, 2);

    await smartgym.methods.inputWorkout('20221123', 0, 45, 400, 55, 54, 'Good1').send({
      from: accounts[0],
      gas: '5000000'
    });

    const gymnum = await smartgym.methods.getGymLength().call();
    assert.equal(gymnum, 1);

  });

  it('create account, workout and input gym 2 times', async () => {
    await smartgym.methods.createAccount('name', 0, 170, 55, 50).send({
      from: accounts[0],
      gas: '5000000'
    });

    const accountnum = await smartgym.methods.getAccountLength().call();
    assert.equal(accountnum, 1);

    await smartgym.methods.createWorkout('diet', '20221122').send({
      from: accounts[0],
      gas: '5000000'
    });

    const workoutnum = await smartgym.methods.getWorkoutLength().call();
    assert.equal(workoutnum, 1);

    await smartgym.methods.inputWorkout('20221123', 0, 45, 400, 55, 54, 'Good1').send({
      from: accounts[0],
      gas: '5000000'
    });

    await smartgym.methods.inputWorkout('20221124', 0, 45, 400, 55, 54, 'Good2').send({
      from: accounts[0],
      gas: '5000000'
    });

    const gymnum = await smartgym.methods.getGymLength().call();
    assert.equal(gymnum, 2);

  });
});

describe('Exception Case', () => {

  it('create account by same address', async () => {
    await smartgym.methods.createAccount('name', 0, 170, 55, 50).send({
      from: accounts[0],
      gas: '5000000'
    });

    await smartgym.methods.createAccount('name', 0, 170, 55, 50).send({
      from: accounts[0],
      gas: '5000000'
    });
  });

  it('create account with bad gender', async () => {
    await smartgym.methods.createAccount('name', 5, 170, 55, 50).send({
      from: accounts[0],
      gas: '5000000'
    });
  });

  it('create workout with bad date', async () => {
    await smartgym.methods.createAccount('name', 0, 170, 55, 50).send({
      from: accounts[0],
      gas: '5000000'
    });

    const accountnum = await smartgym.methods.getAccountLength().call();
    assert.equal(accountnum, 1);

    await smartgym.methods.createWorkout('diet', '202211223').send({
      from: accounts[0],
      gas: '5000000'
    });
  });

  it('input gym with bad date', async () => {
    await smartgym.methods.createAccount('name', 0, 170, 55, 50).send({
      from: accounts[0],
      gas: '5000000'
    });

    await smartgym.methods.createWorkout('diet', '20221122').send({
      from: accounts[0],
      gas: '5000000'
    });

    await smartgym.methods.inputWorkout('202211234', 0, 45, 400, 55, 54, 'Good1').send({
      from: accounts[0],
      gas: '5000000'
    });
  });

});
