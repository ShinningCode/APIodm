const express = require('express');
const bcrypt = require('bcrypt');
const TeamMember = require('../models/teamMember');
const log4js = require('log4js');
const logger = log4js.getLogger();
const { can } = require('../middlewares/casl');

async function create(req, res, next) {
    try {
        let name = req.body.name;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let password = req.body.password;
        let curp = req.body.curp;
        let rfc = req.body.rfc;
        let skills = req.body.skills;
        let rol = req.body.rol;

        //Generar el salt con las iteraciones para generar la cadena
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        let teamMember = new TeamMember({
            name: name,
            lastName: lastName,
            email: email,
            password: passwordHash,
            salt: salt,
            curp: curp,
            rfc: rfc,
            skills: skills,
            rol: rol
        });

        teamMember.save().then(obj => {
            logger.level('info');
            logger.info(res.__('user.create'));
            res.status(200).json({
                message: res.__("user.create"),
                obj: obj
            });
        }).catch(ex => {
            logger.level('error');
            logger.error(res.__('user.error'));
            res.status(500).json({
                message: res.__("user.notcreate"),
                obj: ex
            });
        });
    } catch (error) {
        res.status(500).json({
            message: res.__("user.notcreate"),
            obj: error
        });
    }
}

async function update(req, res, next) {
    try {
        const userId = req.params.id;
        const { currerntPassword, newPassword } = req.body;
        const user = await TeamMember.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: res.__("user.notfound")
            });
        }
        const isMatch = await bcrypt.compare(currerntPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: res.__("user.incorrectpass")
            });
        }
        const salt = await bcrypt.genSalt(10);
        const newPasswordHash = await bcrypt.hash(newPassword, salt);
        await TeamMember.updateOne({ "_id": userId }, { password: newPasswordHash, salt: salt });
        res.status(200).json({
            message: res.__("user.update")
        });
    } catch (error) {
        res.status(500).json({
            message: res.__("user.notupdate"),
            ex: error
        });
    }
}

async function destroy(req, res, next) {
    try {
        const userId = req.params.id;
        const result = await TeamMember.deleteOne({ _id: userId });
        if (result.deletedCount === 1) {
            res.status(200).json({
                message: res.__("user.delete")
            });
        } else {
            res.status(404).json({
                message: res.__("user.notfound")
            });
        }
    } catch (error) {
        res.status(500).json({
            message: res.__("user.notdeleted"),
            obj: error
        });
    }
    
}

module.exports = {
    create: can('create', 'TeamMember', create),
    update: can('update', 'TeamMember', update),
    destroy: can('delete', 'TeamMember', destroy)
};