const ServicosService = require('../services/servicos.js');

class ServicosController {
    static async buscar_servicos(req, res) {
        try{
            const servicos = await ServicosService.buscar_servicos();
            return res.status(200).json({
                sucesso: true,
                dados: servicos
            });
        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                mensagem: error.message
            });
        }
    }

    static async buscar_servico_por_id(req, res) {
        try{
            const id = req.params.id;
            const servico = await ServicosService.buscar_servico_por_id(id);
            return res.status(200).json({
                sucesso: true,
                dados: servico
            });
        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                mensagem: error.message
            });
        }
    }

    static async buscar_servicos_por_area(req, res) {
        try{
            const area_id = req.params.area_id;
            const servicos = await ServicosService.buscar_servicos_por_area(area_id);
            return res.status(200).json({
                sucesso: true,
                dados: servicos
            });
        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                mensagem: error.message
            });
        }
    }

    static async criar_servico(req, res) {
        try{
            const servico = req.body;
            const servico_id = await ServicosService.criar_servico(servico);
            return res.status(201).json({
                sucesso: true,
                dados: servico_id
            });
        }catch(error){
            return res.status(500).json({
                sucesso: false,
                mensagem: error.message
            });
        }
    }

    static async atualizar_servico(req, res) {
        try{
            const id = req.params.id;
            const servico = req.body;
            const resultado = await ServicosService.atualizar_servico(id, servico);
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Serviço atualizado com sucesso',
                dados: resultado
            });
        }catch(error){
            return res.status(500).json({
                sucesso: false,
                mensagem: error.message
            });
        }
    }

    static async deletar_servico(req, res) {
        try{
            const id = req.params.id;
            await ServicosService.deletar_servico(id);
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Serviço deletado com sucesso'
            });
        }catch(error){
            return res.status(500).json({
                sucesso: false,
                mensagem: error.message
            });
        }
    }
}

module.exports = ServicosController;
